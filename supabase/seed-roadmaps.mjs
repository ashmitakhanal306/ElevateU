/**
 * seed-roadmaps.mjs
 * 
 * Reads all *.seed.json files from supabase/seeds/ and upserts their data
 * into Supabase (roadmaps → roadmap_topics → roadmap_subtopics).
 * 
 * Run with:  node supabase/seed-roadmaps.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL     = 'https://jdjgasrypbnkknlomxdf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Lif9rDPKweI1ZBzQ2BWD2A_UbxKllMr';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Category map (slug → category) ─────────────────────────────────────────
const CATEGORY_MAP = {
  'frontend':           'Engineering',
  'backend':            'Engineering',
  'full-stack':         'Engineering',
  'android':            'Engineering',
  'devops':             'Engineering',
  'devsecops':          'Engineering',
  'ios':                'Engineering',
  'postgresql':         'Engineering',
  'blockchain':         'Engineering',
  'qa':                 'Engineering',
  'software-architect': 'Engineering',
  'game-developer':     'Engineering',
  'ux-design':          'Design',
  'data-analyst':       'Data & AI',
  'ai-engineer':        'Data & AI',
  'ai-data-scientist':  'Data & AI',
  'data-engineer':      'Data & AI',
  'machine-learning':   'Data & AI',
  'mlops':              'Data & AI',
  'bi-analyst':         'Data & AI',
  'product-manager':    'Management',
  'engineering-manager':'Management',
  'developer-relations':'Management',
};

async function seedFile(filePath) {
  const raw  = readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  const slug = data.slug;
  const title = data.title;
  const category = data.category || CATEGORY_MAP[slug] || 'Engineering';

  console.log(`\n📦  Processing: ${title} (${slug})`);

  // ── 1. Upsert roadmap row ─────────────────────────────────────────────────
  const { data: existing, error: fetchErr } = await supabase
    .from('roadmaps')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (fetchErr) { console.error(`  ✗ fetch error:`, fetchErr.message); return; }

  let roadmapId;

  if (existing) {
    roadmapId = existing.id;
    console.log(`  ↩  Already exists (id: ${roadmapId}) — skipping roadmap insert`);
  } else {
    roadmapId = randomUUID();
    const { error: insErr } = await supabase
      .from('roadmaps')
      .insert({ id: roadmapId, slug, title, category });

    if (insErr) {
      console.error(`  ✗ insert roadmap error:`, insErr.message);
      return;
    }
    console.log(`  ✓ Inserted roadmap (id: ${roadmapId})`);
  }

  // ── 2. Check if topics already exist ─────────────────────────────────────
  const { count: topicCount } = await supabase
    .from('roadmap_topics')
    .select('id', { count: 'exact', head: true })
    .eq('roadmap_id', roadmapId);

  if (topicCount > 0) {
    console.log(`  ↩  Topics already seeded (${topicCount} topics) — skipping`);
    return;
  }

  // ── 3. Insert topics & subtopics ─────────────────────────────────────────
  const topics = data.topics || [];
  let totalSubtopics = 0;

  for (const topic of topics) {
    const topicId = randomUUID();
    const { error: topErr } = await supabase
      .from('roadmap_topics')
      .insert({
        id: topicId,
        roadmap_id: roadmapId,
        title: topic.title,
        order_index: topic.order_index,
      });

    if (topErr) {
      console.error(`  ✗ insert topic "${topic.title}":`, topErr.message);
      continue;
    }

    const subtopics = topic.subtopics || [];
    for (const sub of subtopics) {
      const { error: subErr } = await supabase
        .from('roadmap_subtopics')
        .insert({
          id: randomUUID(),
          topic_id: topicId,
          title: sub.title,
          resource_url: sub.resource_url || null,
          resource_type: sub.resource_type || null,
          order_index: sub.order_index,
        });

      if (subErr) {
        console.error(`    ✗ insert subtopic "${sub.title}":`, subErr.message);
      } else {
        totalSubtopics++;
      }
    }
  }

  console.log(`  ✓ Inserted ${topics.length} topics, ${totalSubtopics} subtopics`);
}

async function main() {
  const seedsDir = join(__dirname, 'seeds');
  const files = readdirSync(seedsDir)
    .filter(f => f.endsWith('.seed.json'))
    .map(f => join(seedsDir, f));

  console.log(`🚀  Found ${files.length} seed files\n`);

  for (const file of files) {
    await seedFile(file);
  }

  console.log('\n✅  All done!');
}

main().catch(console.error);
