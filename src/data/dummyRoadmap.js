/**
 * dummyRoadmap.js — Static seed data for the Personalized Learning Roadmap.
 */

const dummyRoadmap = {
  targetCareer: 'Frontend Developer',
  generatedFrom: 'skill-gap-analysis',
  milestones: [
    {
      id: 'm1',
      title: 'Strengthen JavaScript fundamentals',
      relatedSkill: 'JavaScript',
      status: 'completed',
      deadline: '2026-06-15',
      linkedCourseId: 'course-1',
      steps: [
        { id: 's1', label: 'Complete "JavaScript Essentials" course', done: true },
        { id: 's2', label: 'Build 2 small practice projects', done: true }
      ]
    },
    {
      id: 'm2',
      title: 'Learn React fundamentals',
      relatedSkill: 'React',
      status: 'in-progress',
      deadline: '2026-07-30',
      linkedCourseId: 'course-1',
      steps: [
        { id: 's3', label: 'Complete "React - The Complete Guide" course', done: true },
        { id: 's4', label: 'Build a portfolio project using React', done: false }
      ]
    },
    {
      id: 'm3',
      title: 'Master State Management (Redux/Context API)',
      relatedSkill: 'State Management',
      status: 'upcoming',
      deadline: '2026-08-20',
      linkedCourseId: null,
      steps: [
        { id: 's5', label: 'Understand global state concepts', done: false },
        { id: 's6', label: 'Implement Redux in a sample e-commerce app', done: false }
      ]
    },
    {
      id: 'm4',
      title: 'Enhance UI/UX Design Skills',
      relatedSkill: 'UI/UX Design',
      status: 'upcoming',
      deadline: '2026-09-10',
      linkedCourseId: 'course-7',
      steps: [
        { id: 's7', label: 'Complete "Figma UI UX Design Essentials" course', done: false },
        { id: 's8', label: 'Design a landing page mockup', done: false }
      ]
    },
    {
      id: 'm5',
      title: 'Prepare for Technical Interviews',
      relatedSkill: 'Interview Prep',
      status: 'upcoming',
      deadline: '2026-09-25',
      linkedCourseId: null,
      steps: [
        { id: 's9', label: 'Practice Data Structures and Algorithms', done: false },
        { id: 's10', label: 'Do 3 mock interviews (STAR method)', done: false }
      ]
    }
  ]
};

export default dummyRoadmap;
