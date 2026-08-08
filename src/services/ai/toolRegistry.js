/**
 * toolRegistry.js — Day 1: Function Calling & Domain Tool Registry.
 * Exposes ElevateU domain capabilities as structured tools executable by AI Agents.
 */

import { getProfile, updateProfile } from '../profileService';
import { analyzeResume } from '../resumeService';
import { getRecommendations, getSkillGapAnalysis } from '../careerService';

import { getOpportunityRecommendations } from '../opportunityService';

import { fetchActiveRoadmapDetail } from '../roadmapService';



/**
 * Standard Tool Declarations for Gemini Function Calling
 */
export const TOOL_DECLARATIONS = [
  {
    functionDeclarations: [
      {
        name: 'get_user_profile',
        description: 'Retrieves the current student user profile, including skills, experience level, education, and target career role.',
        parameters: {
          type: 'OBJECT',
          properties: {},
          required: []
        }
      },
      {
        name: 'analyze_resume_ats',
        description: 'Analyzes a candidate resume or resume text against ATS criteria and target job description.',
        parameters: {
          type: 'OBJECT',
          properties: {
            jobDescription: { type: 'STRING', description: 'Target job description or title to evaluate against.' }
          },
          required: []
        }
      },
      {
        name: 'calculate_skill_gaps',
        description: 'Calculates missing technical skills, proficiency gaps, and readiness score for a target role.',
        parameters: {
          type: 'OBJECT',
          properties: {
            roleId: { type: 'STRING', description: 'Target career role ID (e.g., frontend-dev, data-scientist, fullstack-dev).' }
          },
          required: ['roleId']
        }
      },
      {
        name: 'search_opportunities',
        description: 'Searches active internship and job opportunities based on location, type, and required skills.',
        parameters: {
          type: 'OBJECT',
          properties: {
            query: { type: 'STRING', description: 'Search term or role title (e.g. React, Intern, Python).' },
            type: { type: 'STRING', description: 'Opportunity type: Internship, Full-time, Remote, Contract.' }
          },
          required: []
        }
      },
      {
        name: 'fetch_learning_roadmap',
        description: 'Retrieves interactive step-by-step learning roadmap and node progress for a career role.',
        parameters: {
          type: 'OBJECT',
          properties: {
            roleId: { type: 'STRING', description: 'Role ID for the roadmap (e.g., frontend-dev, fullstack-dev).' }
          },
          required: ['roleId']
        }
      },
      {
        name: 'recommend_careers',
        description: 'Fetches AI-curated career role recommendations tailored to user skills and background.',
        parameters: {
          type: 'OBJECT',
          properties: {},
          required: []
        }
      }
    ]
  }
];

/**
 * Executes a named tool with provided arguments and returns structured response.
 * 
 * @param {string} name - Name of tool to execute
 * @param {Object} args - Arguments passed by AI agent
 * @returns {Promise<Object>} Execution result object
 */
export async function executeTool(name, args = {}) {
  console.info(`[ToolRegistry] Executing tool '${name}' with args:`, args);

  try {
    switch (name) {
      case 'get_user_profile': {
        const profile = await getProfile();
        return { success: true, tool: name, data: profile };
      }


      case 'analyze_resume_ats': {
        const mockFile = { name: 'Student_Resume_2026.pdf' };
        const result = await analyzeResume(mockFile);
        if (args.jobDescription) {
          result.targetJob = args.jobDescription;
        }
        return { success: true, tool: name, data: result };
      }

      case 'calculate_skill_gaps': {
        const roleId = args.roleId || 'frontend-dev';
        const gapAnalysis = await getSkillGapAnalysis(roleId);
        return { success: true, tool: name, data: gapAnalysis };
      }

      case 'search_opportunities': {
        const opps = await getOpportunityRecommendations();
        return { success: true, tool: name, data: opps };
      }


      case 'fetch_learning_roadmap': {
        const roleId = args.roleId || 'frontend-dev';
        const roadmap = (await fetchActiveRoadmapDetail('guest')) || { title: 'Frontend Developer Roadmap', roleId, progress: 45 };
        return { success: true, tool: name, data: roadmap };
      }


      case 'recommend_careers': {
        const careers = await getRecommendations();
        return { success: true, tool: name, data: careers };
      }


      default:
        throw new Error(`Unknown tool name '${name}'`);
    }
  } catch (error) {
    console.error(`[ToolRegistry] Error executing tool '${name}':`, error);
    return {
      success: false,
      tool: name,
      error: error.message || 'Tool execution failed'
    };
  }
}
