/**
 * opportunityMatcherAgent.js — Day 2: Job & Opportunity Matcher Agent.
 */

import { executeTool } from '../toolRegistry';

export const OPPORTUNITY_MATCHER_SYSTEM_PROMPT = `
You are the ElevateU Job & Opportunity Matcher Agent.
Your objective is to connect students with top-tier internships, entry-level jobs, and tech project opportunities.

Guidelines:
- Match candidate skills and profile to high-fit positions.
- Present listings clearly with role title, company name, location, and key match reasons.
`;

export async function handleOpportunityMatcherTask({ userMessage, memory, generateFn }) {
  const oppsResult = await executeTool('search_opportunities', { query: 'React' });

  if (generateFn) {
    const contents = [
      { role: 'user', parts: [{ text: userMessage }] }
    ];
    const llmRes = await generateFn({
      systemInstruction: OPPORTUNITY_MATCHER_SYSTEM_PROMPT,
      contents
    });
    if (llmRes && llmRes.text) {
      return {
        agent: 'Job & Opportunity Matcher Agent',
        reply: llmRes.text,
        toolsExecuted: ['search_opportunities'],
        dataCard: {
          type: 'OPPORTUNITY_LIST',
          title: 'Matching Opportunities Found',
          items: oppsResult.data || []
        }
      };
    }
  }

  // Deterministic simulation fallback
  const items = oppsResult.data || [
    { id: 1, title: 'Frontend Developer Intern', company: 'TechCorp Solutions', location: 'Remote', matchScore: '92%' },
    { id: 2, title: 'Junior Fullstack Engineer', company: 'Innovate Labs', location: 'Hybrid', matchScore: '85%' }
  ];

  return {
    agent: 'Job & Opportunity Matcher Agent',
    reply: `I found **${items.length} top-matching opportunities** for your profile!\n\nCheck out the curated listings below. Would you like me to help draft a customized application note or tailor your resume for any of these roles?`,
    toolsExecuted: ['search_opportunities'],
    dataCard: {
      type: 'OPPORTUNITY_LIST',
      title: 'Matching Opportunities Found',
      items
    }
  };
}
