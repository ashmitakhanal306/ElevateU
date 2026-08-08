/**
 * roadmapService.js — Supabase-backed API layer for the Learning Roadmap feature.
 *
 * Uses the single shared Supabase client from src/config/supabaseClient.js.
 * Tables used:
 *   roadmaps, roadmap_topics, roadmap_subtopics,
 *   user_roadmap_selections, user_subtopic_progress
 */

import { supabase } from '../config/supabaseClient';
import { useAuthStore } from '../store/authStore';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (id) => typeof id === 'string' && UUID_REGEX.test(id);

// ─── Browse: All Roadmaps ─────────────────────────────────────────────────────

/**
 * Fetch every row from `roadmaps` (for the browse grid).
 * @returns {Promise<Array<{ id, slug, title, category }>>}
 */
export async function fetchAllRoadmaps() {
  const { data, error } = await supabase
    .from('roadmaps')
    .select('id, slug, title, category')
    .order('title');

  if (error) throw error;
  return data;
}

// ─── User Selections ──────────────────────────────────────────────────────────

/**
 * Fetch the set of roadmap IDs already selected by this user.
 * Returns a Set<string> for O(1) lookup.
 * @param {string} userId
 * @returns {Promise<Set<string>>}
 */
export async function fetchUserSelectedIds(userId) {
  if (!isUuid(userId)) {
    const key = `elevateu_roadmap_selections_${userId}`;
    try {
      const stored = localStorage.getItem(key) || '[]';
      return new Set(JSON.parse(stored));
    } catch (e) {
      return new Set();
    }
  }

  const { data, error } = await supabase
    .from('user_roadmap_selections')
    .select('roadmap_id')
    .eq('user_id', userId);

  if (error) throw error;
  return new Set((data || []).map((r) => r.roadmap_id));
}

/**
 * Add a roadmap to this user's selections (upsert — safe to call again if already selected).
 * @param {string} userId
 * @param {string} roadmapId
 */
export async function addRoadmapSelection(userId, roadmapId) {
  if (!isUuid(userId)) {
    const key = `elevateu_roadmap_selections_${userId}`;
    try {
      const stored = localStorage.getItem(key) || '[]';
      const selections = JSON.parse(stored);
      if (!selections.includes(roadmapId)) {
        selections.push(roadmapId);
        localStorage.setItem(key, JSON.stringify(selections));
      }
      
      const activeKey = `elevateu_active_roadmap_${userId}`;
      if (!localStorage.getItem(activeKey)) {
        localStorage.setItem(activeKey, roadmapId);
      }
    } catch (e) {
      console.error('Failed to save selection to localStorage:', e);
    }
    return;
  }

  const { error } = await supabase
    .from('user_roadmap_selections')
    .upsert(
      { user_id: userId, roadmap_id: roadmapId, is_active: false },
      { onConflict: 'user_id,roadmap_id', ignoreDuplicates: true }
    );

  if (error) throw error;
}

// ─── Skill Gap / Active Roadmap ───────────────────────────────────────────────

/**
 * Fetch all roadmaps the user has added (joined with roadmaps table).
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export async function fetchUserRoadmaps(userId) {
  if (!isUuid(userId)) {
    try {
      const key = `elevateu_roadmap_selections_${userId}`;
      const selectedIds = JSON.parse(localStorage.getItem(key) || '[]');
      const allRoadmaps = await fetchAllRoadmaps();
      const activeRoadmapId = localStorage.getItem(`elevateu_active_roadmap_${userId}`);
      
      return selectedIds.map(rid => {
        const rm = allRoadmaps.find(r => r.id === rid) || { title: 'Unknown', category: 'Engineering' };
        return {
          id: rid,
          roadmap_id: rid,
          is_active: rid === activeRoadmapId,
          roadmaps: {
            title: rm.title,
            category: rm.category
          }
        };
      });
    } catch (e) {
      return [];
    }
  }

  const { data, error } = await supabase
    .from('user_roadmap_selections')
    .select('id, roadmap_id, is_active, selected_at, roadmaps(title, category)')
    .eq('user_id', userId)
    .order('selected_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Set one roadmap selection as active; set all others for this user to inactive.
 * @param {string} userId
 * @param {string} selectionId - The `id` (PK) of the user_roadmap_selections row (or roadmapId for localStorage fallback)
 */
export async function setActiveRoadmap(userId, selectionId) {
  if (!isUuid(userId)) {
    localStorage.setItem(`elevateu_active_roadmap_${userId}`, selectionId);
    return;
  }

  // Step 1: set all to false
  const { error: e1 } = await supabase
    .from('user_roadmap_selections')
    .update({ is_active: false })
    .eq('user_id', userId);

  if (e1) throw e1;

  // Step 2: set the chosen one to true
  const { error: e2 } = await supabase
    .from('user_roadmap_selections')
    .update({ is_active: true })
    .eq('id', selectionId)
    .eq('user_id', userId);

  if (e2) throw e2;
}

// ─── Active Roadmap Detail (topics + subtopics) ───────────────────────────────

/**
 * Fetch the user's currently active roadmap with its topics and subtopics,
 * and the user's progress on each subtopic.
 * @param {string} userId
 */
export async function fetchActiveRoadmapDetail(userId) {
  if (!isUuid(userId)) {
    const activeRoadmapId = localStorage.getItem(`elevateu_active_roadmap_${userId}`);
    if (!activeRoadmapId) return null;
    
    const allRoadmaps = await fetchAllRoadmaps();
    const roadmapRow = allRoadmaps.find(r => r.id === activeRoadmapId);
    if (!roadmapRow) return null;

    const { data: topics, error: topErr } = await supabase
      .from('roadmap_topics')
      .select('id, title, order_index')
      .eq('roadmap_id', activeRoadmapId)
      .order('order_index');

    if (topErr) throw topErr;
    if (!topics || topics.length === 0) {
      return { selection_id: activeRoadmapId, roadmap: roadmapRow, topics: [] };
    }

    const topicIds = topics.map((t) => t.id);

    const { data: subtopics, error: subErr } = await supabase
      .from('roadmap_subtopics')
      .select('id, topic_id, title, order_index')
      .in('topic_id', topicIds)
      .order('order_index');

    if (subErr) throw subErr;

    const progressKey = `elevateu_subtopic_progress_${userId}`;
    let progressMap = {};
    try {
      progressMap = JSON.parse(localStorage.getItem(progressKey) || '{}');
    } catch (e) {}

    const subtopicsByTopic = {};
    (subtopics || []).forEach((s) => {
      if (!subtopicsByTopic[s.topic_id]) subtopicsByTopic[s.topic_id] = [];
      subtopicsByTopic[s.topic_id].push({
        id: s.id,
        title: s.title,
        order_index: s.order_index,
        status: progressMap[s.id] || 'not_started',
      });
    });

    const enrichedTopics = topics.map((t) => ({
      ...t,
      subtopics: subtopicsByTopic[t.id] || [],
    }));

    return {
      selection_id: activeRoadmapId,
      roadmap: roadmapRow,
      topics: enrichedTopics,
    };
  }

  // 1. Find the active selection
  const { data: selRows, error: selErr } = await supabase
    .from('user_roadmap_selections')
    .select('id, roadmap_id')
    .eq('user_id', userId)
    .eq('is_active', true)
    .limit(1);

  if (selErr) throw selErr;
  if (!selRows || selRows.length === 0) return null;

  const selectionId = selRows[0].id;
  const roadmapId = selRows[0].roadmap_id;

  // 2. Fetch roadmap metadata
  const { data: roadmapRow, error: rmErr } = await supabase
    .from('roadmaps')
    .select('id, title, category')
    .eq('id', roadmapId)
    .single();

  if (rmErr) throw rmErr;

  // 3. Fetch topics ordered
  const { data: topics, error: topErr } = await supabase
    .from('roadmap_topics')
    .select('id, title, order_index')
    .eq('roadmap_id', roadmapId)
    .order('order_index');

  if (topErr) throw topErr;

  if (!topics || topics.length === 0) {
    return { selection_id: selectionId, roadmap: roadmapRow, topics: [] };
  }

  const topicIds = topics.map((t) => t.id);

  // 4. Fetch all subtopics for these topics
  const { data: subtopics, error: subErr } = await supabase
    .from('roadmap_subtopics')
    .select('id, topic_id, title, order_index')
    .in('topic_id', topicIds)
    .order('order_index');

  if (subErr) throw subErr;

  // 5. Fetch this user's progress for all these subtopics
  const subtopicIds = (subtopics || []).map((s) => s.id);
  let progressMap = {};

  if (subtopicIds.length > 0) {
    const { data: progress, error: progErr } = await supabase
      .from('user_subtopic_progress')
      .select('subtopic_id, status')
      .eq('user_id', userId)
      .in('subtopic_id', subtopicIds);

    if (progErr) throw progErr;

    (progress || []).forEach((p) => {
      progressMap[p.subtopic_id] = p.status;
    });
  }

  // 6. Assemble the tree
  const subtopicsByTopic = {};
  (subtopics || []).forEach((s) => {
    if (!subtopicsByTopic[s.topic_id]) subtopicsByTopic[s.topic_id] = [];
    subtopicsByTopic[s.topic_id].push({
      id: s.id,
      title: s.title,
      order_index: s.order_index,
      status: progressMap[s.id] || 'not_started',
    });
  });

  const enrichedTopics = topics.map((t) => ({
    ...t,
    subtopics: subtopicsByTopic[t.id] || [],
  }));

  return {
    selection_id: selectionId,
    roadmap: roadmapRow,
    topics: enrichedTopics,
  };
}

// ─── Progress Toggle ──────────────────────────────────────────────────────────

/**
 * Toggle a subtopic's status between 'not_started' and 'completed'.
 * @param {string} userId
 * @param {string} subtopicId
 * @param {'not_started'|'completed'} currentStatus
 * @returns {Promise<'not_started'|'completed'>} The new status
 */
export async function toggleSubtopicProgress(userId, subtopicId, currentStatus) {
  const newStatus = currentStatus === 'completed' ? 'not_started' : 'completed';
  
  if (!isUuid(userId)) {
    const progressKey = `elevateu_subtopic_progress_${userId}`;
    try {
      const progressMap = JSON.parse(localStorage.getItem(progressKey) || '{}');
      progressMap[subtopicId] = newStatus;
      localStorage.setItem(progressKey, JSON.stringify(progressMap));
    } catch (e) {}
    return newStatus;
  }

  const completedAt = newStatus === 'completed' ? new Date().toISOString() : null;

  const { error } = await supabase
    .from('user_subtopic_progress')
    .upsert(
      {
        user_id: userId,
        subtopic_id: subtopicId,
        status: newStatus,
        completed_at: completedAt,
      },
      { onConflict: 'user_id,subtopic_id' }
    );

  if (error) throw error;
  return newStatus;
}

// ─── Progress Calculation ─────────────────────────────────────────────────────

/**
 * Compute journey progress % for a roadmap:
 * @param {string} userId
 * @param {string} roadmapId
 * @returns {Promise<number>} 0–100
 */
export async function computeRoadmapProgress(userId, roadmapId) {
  // Get all topic IDs for this roadmap
  const { data: topics, error: topErr } = await supabase
    .from('roadmap_topics')
    .select('id')
    .eq('roadmap_id', roadmapId);

  if (topErr) throw topErr;
  if (!topics || topics.length === 0) return 0;

  const topicIds = topics.map((t) => t.id);

  // Count total subtopics
  const { count: total, error: totalErr } = await supabase
    .from('roadmap_subtopics')
    .select('id', { count: 'exact', head: true })
    .in('topic_id', topicIds);

  if (totalErr) throw totalErr;
  if (!total) return 0;

  // Get all subtopic IDs
  const { data: subtopics, error: subErr } = await supabase
    .from('roadmap_subtopics')
    .select('id')
    .in('topic_id', topicIds);

  if (subErr) throw subErr;
  const subtopicIds = (subtopics || []).map((s) => s.id);

  // Count completed
  let completed = 0;
  if (!isUuid(userId)) {
    const progressKey = `elevateu_subtopic_progress_${userId}`;
    try {
      const progressMap = JSON.parse(localStorage.getItem(progressKey) || '{}');
      completed = subtopicIds.filter(sid => progressMap[sid] === 'completed').length;
    } catch (e) {}
  } else {
    const { count: dbCount, error: compErr } = await supabase
      .from('user_subtopic_progress')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'completed')
      .in('subtopic_id', subtopicIds);

    if (compErr) throw compErr;
    completed = dbCount || 0;
  }

  return total === 0 ? 0 : Math.round(((completed || 0) / total) * 100);
}

/**
 * Calculates overall progress of the current logged-in user's active roadmap.
 * @returns {Promise<number>} Progress percentage (0-100)
 */
export async function getOverallProgress() {
  const user = useAuthStore.getState().user;
  if (!user) return 0;

  if (!isUuid(user.id)) {
    const activeRoadmapId = localStorage.getItem(`elevateu_active_roadmap_${user.id}`);
    if (!activeRoadmapId) return 0;
    return computeRoadmapProgress(user.id, activeRoadmapId);
  }

  // Find active selection in Supabase
  const { data: selRows, error: selErr } = await supabase
    .from('user_roadmap_selections')
    .select('roadmap_id')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .limit(1);

  if (selErr || !selRows || selRows.length === 0) return 0;
  
  return computeRoadmapProgress(user.id, selRows[0].roadmap_id);
}

