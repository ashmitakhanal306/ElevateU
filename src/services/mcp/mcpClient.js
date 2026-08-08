/**
 * mcpClient.js — Day 4: Model Context Protocol (MCP) Client Adapter.
 * Connects AI agents to MCP Servers for standardized tool calling and resource access.
 */

import { mcpServer } from './elevateuMcpServer';

class McpClient {
  constructor() {
    this.server = mcpServer;
    this.isInitialized = false;
  }

  async init() {
    if (!this.isInitialized) {
      await this.server.handleRequest('initialize');
      this.isInitialized = true;
    }
  }

  async listTools() {
    await this.init();
    const res = await this.server.handleRequest('tools/list');
    return res.tools || [];
  }

  async invokeTool(toolName, args = {}) {
    await this.init();
    const res = await this.server.handleRequest('tools/call', {
      name: toolName,
      arguments: args
    });

    if (res.isError) {
      throw new Error(`MCP Tool Error: ${res.content?.[0]?.text}`);
    }

    try {
      return JSON.parse(res.content?.[0]?.text || '{}');
    } catch {
      return { raw: res.content?.[0]?.text };
    }
  }

  async readResource(uri) {
    await this.init();
    const res = await this.server.handleRequest('resources/read', { uri });
    return res.contents?.[0] || null;
  }
}

export const mcpClient = new McpClient();
