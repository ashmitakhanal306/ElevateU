/**
 * resumeSpecialistAgent.js — Day 2: Resume & ATS Specialist Agent.
 */

import { executeTool } from '../toolRegistry';

export const RESUME_SPECIALIST_SYSTEM_PROMPT = `
You are the ElevateU Resume & ATS Specialist Agent.
Your mission is to help job seekers pass ATS (Applicant Tracking Systems) filters and impress hiring managers.

Guidelines:
- Analyze resume structure, missing keywords, and readability metrics.
- Provide concrete bullet point improvements using action verbs and quantified impact (e.g. "Increased API throughput by 40%").
- Highlight critical formatting and keyword recommendations.
`;

export async function handleResumeSpecialistTask({ userMessage, memory, generateFn }) {
  const atsResult = await executeTool('analyze_resume_ats', { jobDescription: 'Frontend Engineer' });

  if (generateFn) {
    const contents = [
      { role: 'user', parts: [{ text: userMessage }] }
    ];
    const llmRes = await generateFn({
      systemInstruction: RESUME_SPECIALIST_SYSTEM_PROMPT,
      contents
    });
    if (llmRes && llmRes.text) {
      return {
        agent: 'Resume & ATS Specialist Agent',
        reply: llmRes.text,
        toolsExecuted: ['analyze_resume_ats'],
        dataCard: {
          type: 'RESUME_SCORE',
          title: 'ATS Resume Score Report',
          score: atsResult.data?.atsScore || 74,
          missingKeywords: atsResult.data?.missingKeywords || ['React', 'REST APIs', 'Agile', 'Git'],
          topIssue: atsResult.data?.issues?.[0]?.message || 'Missing a dedicated Technical Skills section'
        }
      };
    }
  }

  // Deterministic simulation fallback
  const score = atsResult.data?.atsScore || 74;
  const missing = atsResult.data?.missingKeywords?.join(', ') || 'React, REST APIs, Agile';

  return {
    agent: 'Resume & ATS Specialist Agent',
    reply: `Your ATS Compatibility Score is **${score}/100**.\n\n**Actionable Recommendations:**\n1. **Add Missing Keywords:** Incorporate **${missing}** naturally inside your work experience bullet points.\n2. **Quantify Results:** Change passive bullets to active statements (e.g. *"Optimized React components reducing load time by 35%"*).\n3. **Formatting:** Ensure contact info is single-line to prevent ATS parser fragmentation.`,
    toolsExecuted: ['analyze_resume_ats'],
    dataCard: {
      type: 'RESUME_SCORE',
      title: 'ATS Resume Score Report',
      score,
      missingKeywords: atsResult.data?.missingKeywords || ['React', 'REST APIs', 'Agile', 'Git'],
      topIssue: atsResult.data?.issues?.[0]?.message || 'Missing a dedicated Technical Skills section'
    }
  };
}
