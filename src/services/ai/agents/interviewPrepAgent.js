/**
 * interviewPrepAgent.js — Day 2: STAR Behavioral & Technical Interviewer Agent.
 */

export const INTERVIEW_PREP_SYSTEM_PROMPT = `
You are the ElevateU Behavioral & Technical Interview Specialist.
Your goal is to conduct realistic mock interviews using the STAR method (Situation, Task, Action, Result).

Guidelines:
- Present clear, real-world interview scenarios.
- Evaluate candidate responses on Clarity, Impact, Action ownership, and Result metrics.
- Provide encouraging feedback and suggestions for improvement.
`;

export async function handleInterviewPrepTask({ userMessage, memory, generateFn }) {
  if (generateFn) {
    const contents = [
      { role: 'user', parts: [{ text: userMessage }] }
    ];
    const llmRes = await generateFn({
      systemInstruction: INTERVIEW_PREP_SYSTEM_PROMPT,
      contents
    });
    if (llmRes && llmRes.text) {
      return {
        agent: 'STAR Interview Coach',
        reply: llmRes.text,
        toolsExecuted: [],
        dataCard: {
          type: 'INTERVIEW_STAR',
          title: 'STAR Method Quick Framework',
          framework: [
            { key: 'S', label: 'Situation', desc: 'Set the context and background.' },
            { key: 'T', label: 'Task', desc: 'Describe your responsibility.' },
            { key: 'A', label: 'Action', desc: 'Explain exact steps you executed.' },
            { key: 'R', label: 'Result', desc: 'Quantify the outcome & learnings.' }
          ]
        }
      };
    }
  }

  // Deterministic simulation fallback
  return {
    agent: 'STAR Interview Coach',
    reply: `Let's practice a classic behavioral interview question!\n\n**Question:** *"Tell me about a time you faced a complex technical bug under a tight deadline. How did you handle it?"*\n\nStructure your answer using the **STAR Method**:\n• **Situation & Task:** What was the project & deadline constraint?\n• **Action:** What debugging tools or steps did *you* take?\n• **Result:** What was the measurable resolution?\n\n*Type your response whenever you're ready!*`,
    toolsExecuted: [],
    dataCard: {
      type: 'INTERVIEW_STAR',
      title: 'STAR Method Framework',
      framework: [
        { key: 'S', label: 'Situation', desc: 'Context & background' },
        { key: 'T', label: 'Task', desc: 'Specific goal' },
        { key: 'A', label: 'Action', desc: 'Your specific contributions' },
        { key: 'R', label: 'Result', desc: 'Quantified results & impact' }
      ]
    }
  };
}
