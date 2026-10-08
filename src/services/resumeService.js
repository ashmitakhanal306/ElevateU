/**
 * resumeService.js — Real API layer for the Resume Analysis feature using Gemini API.
 */
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini SDK
// Note: Exposing the API key in the frontend is generally not recommended for production, 
// but it works for local development and demonstration purposes.
const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

/**
 * Converts a File object to the base64 inlineData format expected by the Gemini API.
 */
async function fileToGenerativePart(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type || 'application/pdf', // fallback to pdf if type is empty
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Sends the resume to Gemini for analysis.
 *
 * @param {File} file - The uploaded resume file.
 */
export async function analyzeResume(file) {
  try {
    const filePart = await fileToGenerativePart(file);

    const prompt = `
    You are an expert ATS (Applicant Tracking System) and career coach.
    Analyze the provided resume document.
    Return ONLY a JSON object that strictly matches this exact schema, with no additional text or markdown formatting:
    {
      "atsScore": number (0-100),
      "scoreBreakdown": {
        "formatting": number (0-100),
        "keywords": number (0-100),
        "readability": number (0-100),
        "length": number (0-100)
      },
      "strengths": [ array of 3-4 string sentences highlighting good things about the resume ],
      "issues": [ 
        { "severity": "high" | "medium" | "low", "message": "string describing the issue" }
      ] (list exactly 3-5 issues),
      "missingKeywords": [ array of 4-6 string keywords relevant to their industry ],
      "suggestions": [ array of 3-5 string actionable advice to improve the resume ]
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [prompt, filePart],
      config: {
        responseMimeType: "application/json"
      }
    });

    // Parse the JSON response
    const result = JSON.parse(response.text);
    result.fileName = file.name;
    
    return result;

  } catch (error) {
    console.error("Error analyzing resume with Gemini:", error);
    throw new Error("Failed to analyze resume. Make sure you are uploading a valid PDF.");
  }
}
