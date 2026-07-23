/**
 * dummyAssessments.js — Static seed data for the Skill Assessment module.
 *
 * Contains 4 assessments: 2 Technical, 2 Soft Skills.
 * Each has 6-8 questions.
 */

const dummyAssessments = [
  {
    id: 'js-basics',
    title: 'JavaScript Fundamentals',
    category: 'Technical',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        text: 'Which keyword declares a block-scoped variable in JS?',
        options: ['var', 'let', 'function', 'global'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        text: 'What does `typeof null` evaluate to in JavaScript?',
        options: ['null', 'undefined', 'object', 'number'],
        correctIndex: 2,
      },
      {
        id: 'q3',
        text: 'Which array method adds an element to the end of the array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctIndex: 0,
      },
      {
        id: 'q4',
        text: 'How do you define an arrow function?',
        options: ['function() => {}', '() => {}', '=> function()', '() -> {}'],
        correctIndex: 1,
      },
      {
        id: 'q5',
        text: 'What is the output of `2 + "2"` in JavaScript?',
        options: ['4', '"4"', '"22"', 'NaN'],
        correctIndex: 2,
      },
      {
        id: 'q6',
        text: 'Which statement stops the execution of a function and returns a value?',
        options: ['break', 'return', 'stop', 'exit'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'ds-basics',
    title: 'Data Structures Basics',
    category: 'Technical',
    durationMinutes: 12,
    questions: [
      {
        id: 'q1',
        text: 'Which data structure uses LIFO (Last In First Out)?',
        options: ['Queue', 'Tree', 'Stack', 'Graph'],
        correctIndex: 2,
      },
      {
        id: 'q2',
        text: 'Which data structure uses FIFO (First In First Out)?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        text: 'What is the time complexity to access an element by index in an Array?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
        correctIndex: 2,
      },
      {
        id: 'q4',
        text: 'Which structure consists of nodes where each node points to the next?',
        options: ['Array', 'Linked List', 'Hash Table', 'Set'],
        correctIndex: 1,
      },
      {
        id: 'q5',
        text: 'In a binary search tree, where is a smaller value placed relative to the root?',
        options: ['Left child', 'Right child', 'Root', 'Depends on the tree'],
        correctIndex: 0,
      },
      {
        id: 'q6',
        text: 'Which algorithm is typically used to find the shortest path in an unweighted graph?',
        options: ['DFS', 'BFS', 'Dijkstra', 'Binary Search'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'comm-skills',
    title: 'Communication Skills',
    category: 'Soft Skills',
    durationMinutes: 8,
    questions: [
      {
        id: 'q1',
        text: 'Active listening involves:',
        options: ['Interrupting', 'Formulating your reply while they speak', 'Focusing fully on the speaker', 'Looking away'],
        correctIndex: 2,
      },
      {
        id: 'q2',
        text: 'When writing a professional email, you should:',
        options: ['Use emojis extensively', 'Be concise and clear', 'Write long paragraphs', 'Skip the subject line'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        text: 'Non-verbal communication includes:',
        options: ['Tone of voice', 'Body language', 'Written text', 'Both Tone of voice and Body language'],
        correctIndex: 3,
      },
      {
        id: 'q4',
        text: 'Constructive feedback should be:',
        options: ['Vague', 'Personal', 'Specific and actionable', 'Only positive'],
        correctIndex: 2,
      },
      {
        id: 'q5',
        text: 'If you misunderstand a task, what is the best approach?',
        options: ['Guess what to do', 'Ask clarifying questions immediately', 'Wait until the deadline to ask', 'Ignore the task'],
        correctIndex: 1,
      },
      {
        id: 'q6',
        text: 'Empathy in communication means:',
        options: ['Agreeing with everything', 'Understanding the other person\'s feelings and perspective', 'Feeling sorry for them', 'Trying to solve their problem immediately'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'prob-solving',
    title: 'Problem Solving',
    category: 'Soft Skills',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        text: 'What is the first step in effective problem solving?',
        options: ['Brainstorming solutions', 'Implementing a fix', 'Defining the problem', 'Evaluating results'],
        correctIndex: 2,
      },
      {
        id: 'q2',
        text: 'Root cause analysis helps to:',
        options: ['Find who to blame', 'Identify the underlying reason for a problem', 'Hide the symptoms', 'Delay the project'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        text: 'When faced with a complex problem, a good strategy is to:',
        options: ['Give up', 'Break it down into smaller, manageable parts', 'Try random solutions', 'Ask someone else to do it'],
        correctIndex: 1,
      },
      {
        id: 'q4',
        text: 'Which of these is a brainstorming rule?',
        options: ['Criticize ideas immediately', 'Go for quantity over quality initially', 'Only allow experts to speak', 'Stop after finding one idea'],
        correctIndex: 1,
      },
      {
        id: 'q5',
        text: 'After implementing a solution, what should you do?',
        options: ['Move on immediately', 'Monitor and evaluate the outcome', 'Take all the credit', 'Forget about it'],
        correctIndex: 1,
      },
      {
        id: 'q6',
        text: 'A "workaround" is:',
        options: ['The root cause solution', 'A permanent fix', 'A temporary bypass of a problem', 'A new feature'],
        correctIndex: 2,
      },
    ],
  },
];

export default dummyAssessments;
