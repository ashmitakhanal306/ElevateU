/**
 * resumeService.js — Mock API layer for the Resume Analysis feature.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates a complex backend resume parsing and analysis process.
 * In a real app, the File object would be uploaded via FormData to an ML-powered endpoint.
 *
 * @param {File} file - The uploaded resume file.
 */
export async function analyzeResume(file) {
  // Simulate 1.5s delay to feel like "real processing"
  await delay(1500);

  // Return a rich dummy report
  return {
    fileName: file.name,
    atsScore: 74,
    scoreBreakdown: {
      formatting: 80,
      keywords: 65,
      readability: 78,
      length: 90
    },
    strengths: [
      'Clear reverse-chronological work history',
      'Consistent date formatting',
      'Appropriate resume length (1-2 pages)'
    ],
    issues: [
      { severity: 'high', message: 'Missing a dedicated Skills section' },
      { severity: 'medium', message: 'Contact info split across two lines — may confuse ATS parsers' },
      { severity: 'low', message: 'Some bullet points exceed 2 lines' }
    ],
    missingKeywords: ['React', 'REST APIs', 'Agile', 'Git'],
    suggestions: [
      'Add a Skills section near the top listing your core technical tools',
      'Quantify achievements with numbers where possible (e.g. "improved load time by 30%")',
      'Include keywords from the target job description naturally within bullet points'
    ]
  };
}
