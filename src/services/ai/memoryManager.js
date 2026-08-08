/**
 * memoryManager.js — Day 3: Context Window & Multi-Session Memory Engine.
 * Manages Short-Term Memory, Long-Term User State, Context Truncation, and System Context Injection.
 */

const STORAGE_KEY = 'elevateu_agent_memory_v1';
const MAX_SHORT_TERM_MESSAGES = 10; // Sliding window limit to fit model context window

/**
 * Default memory schema
 */
const DEFAULT_MEMORY_STATE = {
  userProfile: {
    name: 'Alex Johnson',
    targetRole: 'Frontend Developer',
    currentSkills: ['React', 'JavaScript', 'CSS3', 'Git'],
    experienceLevel: 'Entry-level / Student'
  },
  longTermFacts: [
    'User is aiming for React / Frontend engineering internships in 2026.',
    'User prefers step-by-step learning roadmaps with hands-on projects.'
  ],
  sessions: {}
};

class MemoryManager {
  constructor() {
    this.memory = this.loadMemory();
  }

  loadMemory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_MEMORY_STATE, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('[MemoryManager] Failed loading memory from localStorage:', e);
    }
    return DEFAULT_MEMORY_STATE;
  }

  saveMemory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.memory));
    } catch (e) {
      console.warn('[MemoryManager] Failed saving memory to localStorage:', e);
    }
  }

  /**
   * Adds a message turn to short-term session memory.
   */
  addSessionMessage(sessionId = 'default', message) {
    if (!this.memory.sessions[sessionId]) {
      this.memory.sessions[sessionId] = [];
    }
    this.memory.sessions[sessionId].push({
      ...message,
      timestamp: Date.now()
    });

    // Enforce sliding window truncation to conserve context tokens
    if (this.memory.sessions[sessionId].length > MAX_SHORT_TERM_MESSAGES) {
      this.memory.sessions[sessionId] = this.memory.sessions[sessionId].slice(-MAX_SHORT_TERM_MESSAGES);
    }

    this.saveMemory();
  }

  /**
   * Retrieves short-term message history for session.
   */
  getShortTermHistory(sessionId = 'default') {
    return this.memory.sessions[sessionId] || [];
  }

  /**
   * Updates long-term facts or target goals.
   */
  addLongTermFact(fact) {
    if (fact && !this.memory.longTermFacts.includes(fact)) {
      this.memory.longTermFacts.push(fact);
      this.saveMemory();
    }
  }

  /**
   * Formats enriched system context prompt combining user profile & long-term memory.
   */
  buildEnrichedContext(baseSystemPrompt = '') {
    const profile = this.memory.userProfile;
    const facts = this.memory.longTermFacts.map(f => `- ${f}`).join('\n');

    return `
${baseSystemPrompt}

=== USER CONTEXT & LONG-TERM MEMORY ===
Candidate Name: ${profile.name}
Target Role: ${profile.targetRole}
Skills: ${profile.currentSkills.join(', ')}
Experience: ${profile.experienceLevel}

Known Background & Preferences:
${facts}
=======================================
`.trim();
  }

  clearSession(sessionId = 'default') {
    if (this.memory.sessions[sessionId]) {
      delete this.memory.sessions[sessionId];
      this.saveMemory();
    }
  }
}

export const memoryManager = new MemoryManager();
