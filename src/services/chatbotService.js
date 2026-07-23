/**
 * chatbotService.js — Mock API layer for the AI Career Chatbot.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates a response from an AI backend.
 * Uses simple keyword matching to provide helpful, mentor-like advice.
 * 
 * @param {string} userMessage - The text sent by the user.
 * @returns {Promise<string>} The bot's response.
 */
export async function getBotReply(userMessage) {
  // Simulate network / AI processing delay
  await delay(900);

  const msg = userMessage.toLowerCase();

  // Keyword Matching Logic
  if (msg.includes('resume') || msg.includes('cv')) {
    return "When it comes to your resume, make sure you're optimizing for ATS (Applicant Tracking Systems). I recommend keeping the formatting simple, using clear headings, and naturally including keywords from the job description. Why not try our Resume Analysis tool? It can give you a personalized score and actionable feedback.";
  }
  
  if (msg.includes('interview')) {
    return "Interviews can be stressful, but preparation is key! A great framework to use for behavioral questions is the STAR method (Situation, Task, Action, Result). Make sure your answers are structured and highlight the impact of your actions. Let me know if you want to practice specific questions!";
  }
  
  if (msg.includes('skill') || msg.includes('learn') || msg.includes('course')) {
    return "Identifying the right skills to learn is half the battle. I suggest checking out our Skill Gap Analysis tool to see exactly what you need for your target roles. Once you know your gaps, you can browse the Courses section to find tailored learning resources.";
  }
  
  if (msg.includes('career') || msg.includes('job') || msg.includes('role')) {
    return "Navigating your career path takes time and exploration. Based on your profile and assessments, we have some curated Career Recommendations that might fit you perfectly. Take a look and see if any of those roles spark your interest!";
  }

  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return "Hello there! I'm the ElevateU Assistant. Think of me as your personal career mentor. You can ask me for advice on improving your resume, preparing for interviews, discovering career paths, or finding the right skills to learn. How can I help you today?";
  }

  // Default / Fallback
  return "That's an interesting point! I'm still learning, but I'm here to help guide you. You can ask me for tips on building your resume, nailing your next interview, bridging your skill gaps, or exploring new career recommendations. What would you like to focus on first?";
}
