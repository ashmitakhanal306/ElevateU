/**
 * geminiClient.js — Core LLM API Wrapper for ElevateU AI Assistant.
 * Uses Google Gen AI SDK or REST API with fallback capabilities.
 */

import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const DEFAULT_MODEL = 'gemini-2.5-flash';

let aiInstance = null;

if (API_KEY && API_KEY !== 'your-gemini-api-key-here') {
  try {
    aiInstance = new GoogleGenAI({ apiKey: API_KEY });
  } catch (err) {
    console.warn('[GeminiClient] Could not initialize GoogleGenAI SDK:', err.message);
  }
}

/**
 * Sends a message prompt to Gemini LLM with optional system instruction and tool definitions.
 * 
 * @param {Object} options
 * @param {string} options.systemInstruction - System prompt guiding the model's behavior.
 * @param {Array<Object>} options.contents - Conversation history / messages array.
 * @param {Array<Object>} [options.tools] - Standard function declarations for tool calling.
 * @param {string} [options.model] - Target Gemini model name.
 * @returns {Promise<{ text: string, functionCalls?: Array<{ name: string, args: Object }> }>}
 */
export async function generateContent({
  systemInstruction,
  contents,
  tools = [],
  model = DEFAULT_MODEL
}) {
  if (!API_KEY || API_KEY === 'your-gemini-api-key-here') {
    console.info('[GeminiClient] Operating in local Agentic Simulation mode (No API Key provided).');
    return null; // Signals fallback simulation mode
  }

  try {
    if (aiInstance) {
      const config = {};
      if (systemInstruction) config.systemInstruction = systemInstruction;
      if (tools && tools.length > 0) config.tools = tools;

      const response = await aiInstance.models.generateContent({
        model: model,
        contents: contents,
        config: config
      });

      const text = response.text || '';
      const functionCalls = response.functionCalls || [];

      return {
        text,
        functionCalls: functionCalls.map(fc => ({
          name: fc.name,
          args: fc.args || {}
        }))
      };
    } else {
      // Direct REST fetch fallback if SDK init had issue
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
      const payload = {
        contents: typeof contents === 'string' ? [{ parts: [{ text: contents }] }] : contents,
      };

      if (systemInstruction) {
        payload.systemInstruction = { parts: [{ text: systemInstruction }] };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Gemini API HTTP Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      const candidate = data.candidates?.[0];
      const part = candidate?.content?.parts?.[0];
      
      const functionCalls = candidate?.content?.parts
        ?.filter(p => p.functionCall)
        .map(p => ({ name: p.functionCall.name, args: p.functionCall.args })) || [];

      return {
        text: part?.text || '',
        functionCalls
      };
    }
  } catch (error) {
    console.error('[GeminiClient] LLM Generation error:', error);
    throw error;
  }
}
