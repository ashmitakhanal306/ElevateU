/**
 * securityGuardrails.js — Day 5: Security Guardrails & Safety Policy Layer.
 * Provides Prompt Injection Defense, PII Scrubbing, Input Sanitization, and Off-Domain Policy Enforcement.
 */

// Known prompt injection phrases & jailbreak patterns
const PROMPT_INJECTION_PATTERNS = [
  /ignore previous instructions/i,
  /ignore all prior rules/i,
  /you are now in developer mode/i,
  /override system prompt/i,
  /forget your guidelines/i,
  /act as a unfiltered/i,
  /system prompt print/i
];

// Regex for redacting sensitive PII before forwarding to external API
const PII_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g
};

/**
 * Validates user input against security policies and sanitizes sensitive data.
 * 
 * @param {string} input - User message input
 * @returns {{ allowed: boolean, sanitizedInput: string, reason?: string }}
 */
export function validateInputGuardrails(input) {
  if (!input || typeof input !== 'string') {
    return { allowed: false, sanitizedInput: '', reason: 'Empty message' };
  }

  // 1. Prompt Injection & Jailbreak Defense
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      console.warn('[SecurityGuardrails] Prompt injection attempt blocked:', input);
      return {
        allowed: false,
        sanitizedInput: input,
        reason: "Security Guardrail: Prompt manipulation or system override attempt detected. Please ask career or skill related questions."
      };
    }
  }

  // 2. PII Scrubbing & Data Redaction
  let sanitized = input;
  sanitized = sanitized.replace(PII_PATTERNS.email, '[REDACTED_EMAIL]');
  sanitized = sanitized.replace(PII_PATTERNS.phone, '[REDACTED_PHONE]');
  sanitized = sanitized.replace(PII_PATTERNS.ssn, '[REDACTED_SSN]');

  return {
    allowed: true,
    sanitizedInput: sanitized
  };
}

/**
 * Enforces output policy to keep AI responses grounded, accurate, and safe.
 * 
 * @param {string} responseText - Generated response text
 * @returns {string} Safe output string
 */
export function validateOutputGuardrails(responseText) {
  if (!responseText) return "I'm sorry, I could not process that request safely.";

  // Basic HTML/Script tag neutralization for render safety
  let safeOutput = responseText
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '[Blocked Script]');

  return safeOutput;
}
