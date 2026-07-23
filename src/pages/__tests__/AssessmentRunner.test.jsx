import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AssessmentRunner from '../AssessmentRunner';
import * as assessmentService from '../../services/assessmentService';

// Mock assessmentService to avoid artificial delays during testing
vi.mock('../../services/assessmentService', () => ({
  getAssessmentById: vi.fn(),
  submitAssessment: vi.fn(),
}));

describe('AssessmentRunner Page Component', () => {
  const mockAssessment = {
    id: 'js-basics',
    title: 'JavaScript Fundamentals',
    category: 'Technical',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        text: 'Which keyword declares a block-scoped variable in JS?',
        options: ['var', 'let', 'function', 'global'],
      },
      {
        id: 'q2',
        text: 'What does typeof null evaluate to in JavaScript?',
        options: ['null', 'undefined', 'object', 'number'],
      },
    ],
  };

  const renderComponent = () => {
    return render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/assessment/js-basics']}>
          <Routes>
            <Route path="/assessment/:assessmentId" element={<AssessmentRunner />} />
            <Route path="/assessment/:assessmentId/results" element={<div>Results Page</div>} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  /**
   * Test 1: Renders the first question when assessment data finishes loading.
   * Why it matters: Ensures assessment flow starts smoothly on mount displaying question 1 of N.
   */
  it('renders the first question after getAssessmentById resolves', async () => {
    vi.spyOn(assessmentService, 'getAssessmentById').mockResolvedValue(mockAssessment);

    renderComponent();

    // Verify loading spinner is initially shown then replaced by first question
    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    expect(screen.getByText('Which keyword declares a block-scoped variable in JS?')).toBeInTheDocument();
    expect(screen.getByText('var')).toBeInTheDocument();
    expect(screen.getByText('let')).toBeInTheDocument();
  });

  /**
   * Test 2: Next button is disabled until user selects an option.
   * Why it matters: Prevents students from skipping questions without selecting an answer.
   */
  it('disables the Next button until an option is selected', async () => {
    vi.spyOn(assessmentService, 'getAssessmentById').mockResolvedValue(mockAssessment);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Which keyword declares a block-scoped variable in JS?')).toBeInTheDocument();
    });

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();

    // Select option 1 ("let")
    const optionLet = screen.getByText('let');
    await userEvent.click(optionLet);

    // Next button should now be enabled
    expect(nextButton).toBeEnabled();
  });

  /**
   * Test 3: Selecting an option and clicking Next advances to question 2.
   * Why it matters: Verifies step navigation across multi-question quizzes works correctly.
   */
  it('advances to the second question upon selecting an option and clicking Next', async () => {
    const user = userEvent.setup();
    vi.spyOn(assessmentService, 'getAssessmentById').mockResolvedValue(mockAssessment);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Which keyword declares a block-scoped variable in JS?')).toBeInTheDocument();
    });

    // Select "let" option
    await user.click(screen.getByText('let'));

    // Click "Next"
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    // Second question should now be rendered
    expect(screen.getByText('What does typeof null evaluate to in JavaScript?')).toBeInTheDocument();
    expect(screen.getByText('object')).toBeInTheDocument();
  });

  /**
   * Test 4: On the final question, button label changes from Next to Submit.
   * Why it matters: Provides clear visual cues to user when reaching the end of the test.
   */
  it('changes the button label from Next to Submit on the final question', async () => {
    const user = userEvent.setup();
    vi.spyOn(assessmentService, 'getAssessmentById').mockResolvedValue(mockAssessment);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Which keyword declares a block-scoped variable in JS?')).toBeInTheDocument();
    });

    // Answer Q1 and go to Q2 (final question)
    await user.click(screen.getByText('let'));
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Verify button label is now "Submit" (not "Next")
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled(); // disabled until Q2 is answered
  });

  /**
   * Test 5: Clicking Submit on the final question submits all collected answers.
   * Why it matters: Ensures user selections across all questions are properly collected and sent to submission handler.
   */
  it('calls submitAssessment with all collected answers when Submit is clicked on the final question', async () => {
    const user = userEvent.setup();
    vi.spyOn(assessmentService, 'getAssessmentById').mockResolvedValue(mockAssessment);
    vi.spyOn(assessmentService, 'submitAssessment').mockResolvedValue({
      score: 100,
      correctCount: 2,
      totalQuestions: 2,
      skillLevel: 'Advanced',
      breakdown: [],
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Which keyword declares a block-scoped variable in JS?')).toBeInTheDocument();
    });

    // Answer Q1 (index 1 -> 'let')
    await user.click(screen.getByText('let'));
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Answer Q2 (index 2 -> 'object')
    await user.click(screen.getByText('object'));

    // Click Submit
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(assessmentService.submitAssessment).toHaveBeenCalledTimes(1);
    expect(assessmentService.submitAssessment).toHaveBeenCalledWith(
      'js-basics',
      {
        q1: 1, // index of 'let'
        q2: 2, // index of 'object'
      }
    );
  });
});
