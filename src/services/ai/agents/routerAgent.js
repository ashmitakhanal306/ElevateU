/**
 * routerAgent.js — Day 2: Multi-Agent Swarm Router & Coordinator.
 * Evaluates conversation intent and routes tasks to specialized agents.
 */

export const AGENT_TYPES = {
  CAREER_COACH: 'career_coach',
  RESUME_SPECIALIST: 'resume_specialist',
  OPPORTUNITY_MATCHER: 'opportunity_matcher',
  INTERVIEW_PREP: 'interview_prep',
  GENERAL_ASSISTANT: 'general_assistant'
};

/**
 * Classifies user message intent to determine target agent.
 * 
 * @param {string} userMessage - Text message from user.
 * @param {Array<Object>} history - Recent message history.
 * @returns {string} Selected AGENT_TYPE
 */
export function routeMessage(userMessage, history = []) {
  const msg = userMessage.toLowerCase();

  // Resume / CV / ATS intent
  if (
    msg.includes('resume') || 
    msg.includes('cv') || 
    msg.includes('ats') || 
    msg.includes('bullet') || 
    msg.includes('upload resume')
  ) {
    return AGENT_TYPES.RESUME_SPECIALIST;
  }

  // Interview / STAR / Behavioral / Mock interview intent
  if (
    msg.includes('interview') || 
    msg.includes('star method') || 
    msg.includes('behavioral') || 
    msg.includes('question') || 
    msg.includes('mock')
  ) {
    return AGENT_TYPES.INTERVIEW_PREP;
  }

  // Jobs / Internships / Opportunities intent
  if (
    msg.includes('job') || 
    msg.includes('internship') || 
    msg.includes('opening') || 
    msg.includes('hiring') || 
    msg.includes('opportunity') || 
    msg.includes('apply')
  ) {
    return AGENT_TYPES.OPPORTUNITY_MATCHER;
  }

  // Career guidance / Skill gap / Learning Roadmap / Courses intent
  if (
    msg.includes('skill') || 
    msg.includes('gap') || 
    msg.includes('roadmap') || 
    msg.includes('course') || 
    msg.includes('path') || 
    msg.includes('recommend') ||
    msg.includes('career')
  ) {
    return AGENT_TYPES.CAREER_COACH;
  }

  return AGENT_TYPES.GENERAL_ASSISTANT;
}
