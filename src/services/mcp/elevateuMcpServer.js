/**
 * elevateuMcpServer.js — Day 4: Model Context Protocol (MCP) Standard Server.
 * Exposes ElevateU tools, resources, and prompts adhering to official MCP specs.
 */

import { executeTool, TOOL_DECLARATIONS } from '../ai/toolRegistry';

/**
 * Standard MCP Resource definitions
 */
export const MCP_RESOURCES = [
  {
    uri: 'elevateu://resources/user_profile',
    name: 'User Profile Resource',
    mimeType: 'application/json',
    description: 'Current logged-in student profile data including skills, role, and bio.'
  },
  {
    uri: 'elevateu://resources/active_roadmap',
    name: 'Active Learning Roadmap Resource',
    mimeType: 'application/json',
    description: 'Progress nodes and completion state for the student career roadmap.'
  },
  {
    uri: 'elevateu://resources/latest_ats_report',
    name: 'Latest ATS Resume Report',
    mimeType: 'application/json',
    description: 'Most recent ATS score, formatting feedback, and keyword gaps.'
  }
];

/**
 * Standard MCP Prompt Templates
 */
export const MCP_PROMPTS = [
  {
    name: 'ats_optimization_prompt',
    description: 'Generates structured bullet points tailored for passing ATS filters.',
    arguments: [
      { name: 'role', description: 'Target job title', required: true }
    ]
  },
  {
    name: 'star_interview_prompt',
    description: 'Initiates a STAR behavioral interview coaching turn.',
    arguments: [
      { name: 'topic', description: 'Behavioral topic (e.g. Leadership, Conflict, Debugging)', required: false }
    ]
  }
];

export class ElevateUMcpServer {
  constructor() {
    this.name = 'ElevateU MCP Server';
    this.version = '1.0.0';
  }

  /**
   * MCP Request Handler dispatcher
   */
  async handleRequest(method, params = {}) {
    console.info(`[MCP Server] Request received: ${method}`, params);

    switch (method) {
      // Protocol Initialization & Capabilities
      case 'initialize':
        return {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {},
            prompts: {}
          },
          serverInfo: { name: this.name, version: this.version }
        };

      // List Available Tools (MCP Protocol)
      case 'tools/list':
        return {
          tools: TOOL_DECLARATIONS[0].functionDeclarations.map(fd => ({
            name: fd.name,
            description: fd.description,
            inputSchema: fd.parameters
          }))
        };

      // Call MCP Tool
      case 'tools/call': {
        const { name, arguments: args } = params;
        const result = await executeTool(name, args);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ],
          isError: !result.success
        };
      }

      // List MCP Resources
      case 'resources/list':
        return { resources: MCP_RESOURCES };

      // Read MCP Resource
      case 'resources/read': {
        const { uri } = params;
        if (uri === 'elevateu://resources/user_profile') {
          const profileTool = await executeTool('get_user_profile');
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(profileTool.data, null, 2)
              }
            ]
          };
        }
        return { contents: [] };
      }

      // List MCP Prompts
      case 'prompts/list':
        return { prompts: MCP_PROMPTS };

      default:
        throw new Error(`Unsupported MCP method: ${method}`);
    }
  }
}

export const mcpServer = new ElevateUMcpServer();
