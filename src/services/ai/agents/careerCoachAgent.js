/**
 * careerCoachAgent.js — Day 2: Career & Skill Coach Specialist Agent.
 */

import { executeTool } from '../toolRegistry';

export const CAREER_COACH_SYSTEM_PROMPT = `
You are the ElevateU Career & Skill Coach Agent.
Your role is to empower students and early-career professionals to bridge their skill gaps, follow structured learning roadmaps, and achieve their career goals.

Guidelines:
- Provide supportive, actionable advice structured with bullet points.
- Use tools like 'calculate_skill_gaps', 'fetch_learning_roadmap', and 'recommend_careers' to fetch real data before advising.
- Focus on practical, industry-aligned technical and soft skills.
`;

export async function handleCareerCoachTask({ userMessage, memory, generateFn }) {
  // Execute relevant domain tools for career & skills
  const gapResult = await executeTool('calculate_skill_gaps', { roleId: 'frontend-dev' });
  const roadmapResult = await executeTool('fetch_learning_roadmap', { roleId: 'frontend-dev' });

  if (generateFn) {
    const contents = [
      { role: 'user', parts: [{ text: userMessage }] }
    ];
    const llmRes = await generateFn({
      systemInstruction: CAREER_COACH_SYSTEM_PROMPT,
      contents
    });
    if (llmRes && llmRes.text) {
      return {
        agent: 'Career & Skill Coach Agent',
        reply: llmRes.text,
        toolsExecuted: ['calculate_skill_gaps', 'fetch_learning_roadmap'],
        dataCard: {
          type: 'SKILL_GAP',
          title: 'Skill Gap Overview: Frontend Developer',
          readinessScore: gapResult.data?.readinessScore || 72,
          missingSkills: gapResult.data?.missingSkills || ['TypeScript', 'GraphQL', 'Tailwind CSS']
        }
      };
    }
  }

  // Deterministic simulation fallback
  return {
    agent: 'Career & Skill Coach Agent',
    reply: `Based on your current student profile and target goals, you are currently **${gapResult.data?.readinessScore || 72}% ready** for Frontend Developer roles.\n\nKey areas to focus on next:\n• Master **TypeScript** static typing & generics.\n• Practice building production UIs with **Tailwind CSS** & Framer Motion.\n• Explore your interactive **Learning Roadmap** to unlock your next achievement nodes!`,
    toolsExecuted: ['calculate_skill_gaps', 'fetch_learning_roadmap'],
    dataCard: {
      type: 'SKILL_GAP',
      title: 'Skill Gap Overview: Frontend Developer',
      readinessScore: gapResult.data?.readinessScore || 72,
      missingSkills: gapResult.data?.missingSkills || ['TypeScript', 'GraphQL', 'Tailwind CSS']
    }
  };
}
