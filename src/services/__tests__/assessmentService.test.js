import { describe, it, expect } from 'vitest';
import { calculateScore } from '../assessmentService';
import dummyAssessments from '../../data/dummyAssessments';

describe('assessmentService - calculateScore()', () => {
  const assessmentId = 'js-basics';
  const jsAssessment = dummyAssessments.find((a) => a.id === assessmentId);

  // Helper to build 100% correct answers map for js-basics
  const getFullCorrectAnswers = () => {
    const answers = {};
    jsAssessment.questions.forEach((q) => {
      answers[q.id] = q.correctIndex;
    });
    return answers;
  };

  // Helper to build 100% wrong answers map for js-basics
  const getFullWrongAnswers = () => {
    const answers = {};
    jsAssessment.questions.forEach((q) => {
      // Pick an index different from correctIndex
      answers[q.id] = (q.correctIndex + 1) % q.options.length;
    });
    return answers;
  };

  /**
   * Test 1: Verifies that answering all questions correctly yields 100% score
   * and assigns the highest skill classification ('Advanced').
   * Why it matters: Ensures students who master the material get perfect scores and appropriate recognition.
   */
  it('calculates score as 100 and skillLevel as Advanced when all answers are correct', () => {
    const answers = getFullCorrectAnswers();
    const result = calculateScore(assessmentId, answers);

    expect(result.score).toBe(100);
    expect(result.correctCount).toBe(jsAssessment.questions.length);
    expect(result.totalQuestions).toBe(jsAssessment.questions.length);
    expect(result.skillLevel).toBe('Advanced');
  });

  /**
   * Test 2: Verifies that answering all questions incorrectly yields 0% score
   * and assigns the baseline skill classification ('Beginner').
   * Why it matters: Guarantees zero-point baseline accuracy and prevents false positive achievements.
   */
  it('calculates score as 0 and skillLevel as Beginner when all answers are wrong', () => {
    const answers = getFullWrongAnswers();
    const result = calculateScore(assessmentId, answers);

    expect(result.score).toBe(0);
    expect(result.correctCount).toBe(0);
    expect(result.totalQuestions).toBe(jsAssessment.questions.length);
    expect(result.skillLevel).toBe('Beginner');
  });

  /**
   * Test 3: Verifies that a partial score in the 50%-79% range correctly evaluates to 'Intermediate'.
   * Why it matters: Asserts tier boundaries (Intermediate range: 50-79%) work properly for realistic mixed performance.
   * For js-basics (6 questions), getting 4 correct yields 4/6 = ~67%, which falls in 50-79%.
   */
  it('assigns skillLevel as Intermediate when score is in the 50-79% range', () => {
    const answers = {
      q1: jsAssessment.questions[0].correctIndex, // Correct
      q2: jsAssessment.questions[1].correctIndex, // Correct
      q3: jsAssessment.questions[2].correctIndex, // Correct
      q4: jsAssessment.questions[3].correctIndex, // Correct
      q5: 99, // Wrong
      q6: 99, // Wrong
    };

    const result = calculateScore(assessmentId, answers);

    // 4 out of 6 = 67%
    expect(result.correctCount).toBe(4);
    expect(result.totalQuestions).toBe(6);
    expect(result.score).toBe(67);
    expect(result.skillLevel).toBe('Intermediate');
  });

  /**
   * Test 4: Verifies missing or unanswered questions are scored as incorrect without crashing or skipping.
   * Why it matters: Students may leave questions blank; missing keys should default to wrong answers gracefully.
   */
  it('scores missing or unanswered questions as incorrect without throwing errors', () => {
    // Only answer q1 correctly; leave q2..q6 unassigned in answers object
    const answers = {
      q1: jsAssessment.questions[0].correctIndex,
    };

    const result = calculateScore(assessmentId, answers);

    expect(result.correctCount).toBe(1);
    expect(result.totalQuestions).toBe(6);
    expect(result.score).toBe(17); // Math.round(1/6 * 100) = 17
    expect(result.skillLevel).toBe('Beginner');
  });

  /**
   * Test 5: Verifies breakdown array length always equals totalQuestions.
   * Why it matters: The results view relies on breakdown matching question count for detailed review.
   */
  it('returns a breakdown array matching the total number of questions in the assessment', () => {
    const result = calculateScore(assessmentId, {});

    expect(result.breakdown).toBeInstanceOf(Array);
    expect(result.breakdown.length).toBe(jsAssessment.questions.length);
    result.breakdown.forEach((item) => {
      expect(item).toHaveProperty('questionId');
      expect(item).toHaveProperty('text');
      expect(item).toHaveProperty('correct');
    });
  });

  /**
   * Test 6: Throws error when assessment ID is invalid.
   * Why it matters: Prevents silent scoring bugs when an invalid assessment ID is passed.
   */
  it('throws an error when assessment ID is not found', () => {
    expect(() => calculateScore('non-existent-id', {})).toThrow('Assessment not found');
  });
});
