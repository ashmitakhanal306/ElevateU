/**
 * chatbotService.js — Central Agentic AI Orchestrator for ElevateU Assistant.
 * Integrates Kaggle 5-Day Agentic Principles:
 * - Day 1: Function Calling & Tool Registry
 * - Day 2: Multi-Agent Swarm Router
 * - Day 3: Memory Manager & Context Window Truncation
 * - Day 4: Model Context Protocol (MCP) Standard Client & Tools
 * - Day 5: Security Guardrails & Human-in-the-Loop (HITL) Workflows
 */

import { validateInputGuardrails, validateOutputGuardrails } from './ai/securityGuardrails';
import { routeMessage, AGENT_TYPES } from './ai/agents/routerAgent';
import { handleCareerCoachTask } from './ai/agents/careerCoachAgent';
import { handleResumeSpecialistTask } from './ai/agents/resumeSpecialistAgent';
import { handleOpportunityMatcherTask } from './ai/agents/opportunityMatcherAgent';
import { handleInterviewPrepTask } from './ai/agents/interviewPrepAgent';
import { memoryManager } from './ai/memoryManager';
import { generateContent } from './ai/geminiClient';
import { hitlManager, HITL_ACTION_TYPES } from './ai/hitlManager';

/**
 * Primary entry point for ElevateU Assistant chat messages.
 * 
 * @param {string} rawUserMessage - Raw text from user.
 * @param {string} [sessionId='default'] - Chat session identifier.
 * @returns {Promise<Object>} Formatted agent response object for ChatWidget UI.
 */
export async function getBotReply(rawUserMessage, sessionId = 'default') {
  // ─── Step 1: Security Guardrail Input Check (Day 5) ──────────────────────────
  const inputCheck = validateInputGuardrails(rawUserMessage);
  if (!inputCheck.allowed) {
    return {
      agent: 'Security Guardrail',
      reply: "I can only help with career-related topics. Please ask about your resume, skills, jobs, or interview prep! 😊",
      isBlocked: true
    };
  }

  const userMessage = inputCheck.sanitizedInput;

  // ─── Step 2: Multi-Agent Swarm Router (Day 2) ───────────────────────────────
  const history = memoryManager.getShortTermHistory(sessionId);
  const targetAgentType = routeMessage(userMessage, history);

  // Save user turn into memory manager (Day 3)
  memoryManager.addSessionMessage(sessionId, { sender: 'user', text: userMessage });

  let agentResponse = null;

  // ─── Step 3: Sub-Agent Dispatch & Tool Execution (Days 1 & 4) ────────────────
  switch (targetAgentType) {
    case AGENT_TYPES.CAREER_COACH:
      agentResponse = await handleCareerCoachTask({ userMessage, memory: memoryManager, generateFn: generateContent });
      break;

    case AGENT_TYPES.RESUME_SPECIALIST:
      agentResponse = await handleResumeSpecialistTask({ userMessage, memory: memoryManager, generateFn: generateContent });
      break;

    case AGENT_TYPES.OPPORTUNITY_MATCHER:
      agentResponse = await handleOpportunityMatcherTask({ userMessage, memory: memoryManager, generateFn: generateContent });
      break;

    case AGENT_TYPES.INTERVIEW_PREP:
      agentResponse = await handleInterviewPrepTask({ userMessage, memory: memoryManager, generateFn: generateContent });
      break;

    case AGENT_TYPES.GENERAL_ASSISTANT:
    default: {
      // General Gemini call or fallback reply
      const enrichedSystemPrompt = memoryManager.buildEnrichedContext(
        "You are the ElevateU General Career Assistant. Be warm, structured, and helpful."
      );

      const llmRes = await generateContent({
        systemInstruction: enrichedSystemPrompt,
        contents: [{ role: 'user', parts: [{ text: userMessage }] }]
      });

      if (llmRes && llmRes.text) {
        agentResponse = {
          agent: 'ElevateU General Assistant',
          reply: llmRes.text,
          toolsExecuted: []
        };
      } else {
        agentResponse = {
          agent: 'ElevateU General Assistant',
          reply: "I'm here to help! Here's what you can ask me:\n\n• **Resume review** — get an ATS score and improvement tips\n• **Skill gap analysis** — find what skills you need for your dream role\n• **Job & internship search** — discover opportunities that match your profile\n• **Interview practice** — prepare with STAR method coaching",
          toolsExecuted: []
        };
      }
      break;
    }
  }

  // ─── Step 4: Human-in-the-Loop (HITL) Check (Day 5) ───────────────────────
  if (userMessage.toLowerCase().includes('update role') || userMessage.toLowerCase().includes('change target role')) {
    const hitlCard = hitlManager.createPendingAction(HITL_ACTION_TYPES.UPDATE_PROFILE, { targetRole: 'Frontend Developer' });
    agentResponse.hitlAction = hitlCard;
  }

  // ─── Step 5: Security Guardrail Output Check (Day 5) ─────────────────────────
  agentResponse.reply = validateOutputGuardrails(agentResponse.reply);

  // Save bot turn into memory manager (Day 3)
  memoryManager.addSessionMessage(sessionId, { sender: 'bot', text: agentResponse.reply });

  return agentResponse;
}
