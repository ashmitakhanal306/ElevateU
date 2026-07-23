/**
 * dummyProfile.js — Static seed data for the Student Profile feature.
 *
 * This is the canonical shape that all later phases (SkillGap, Career, Roadmap)
 * will read from via profileService. Every field is intentionally typed so that
 * swapping to a real API later requires no structural changes in consumers.
 */

const dummyProfile = {
  /** Basic personal information displayed in the profile header */
  personal: {
    name: 'Aditi Sharma',
    email: 'aditi.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka',
    avatarInitials: 'AS',       // Derived from name; kept explicit for fast reads
  },

  /** Academic history — one object per qualification */
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science',
      institution: 'Indian Institute of Technology, Bengaluru',
      year: '2021 – 2025',
      grade: '8.7 CGPA',
    },
    {
      id: 'edu-2',
      degree: 'Class XII — PCM + Computer Science',
      institution: 'Delhi Public School, R.K. Puram',
      year: '2021',
      grade: '94.2%',
    },
  ],

  /**
   * Skills — each entry has a unique id, name, and proficiency level.
   * Level must be one of: 'Beginner' | 'Intermediate' | 'Advanced'
   * Components map level → Badge variant:
   *   Beginner     → 'info'
   *   Intermediate → 'warning'
   *   Advanced     → 'success'
   */
  skills: [
    { id: 'sk-1', name: 'JavaScript',   level: 'Advanced'     },
    { id: 'sk-2', name: 'React.js',     level: 'Intermediate' },
    { id: 'sk-3', name: 'Python',       level: 'Intermediate' },
    { id: 'sk-4', name: 'Tailwind CSS', level: 'Advanced'     },
    { id: 'sk-5', name: 'SQL',          level: 'Beginner'     },
    { id: 'sk-6', name: 'Machine Learning', level: 'Beginner' },
    { id: 'sk-7', name: 'Node.js',      level: 'Beginner'     },
    { id: 'sk-8', name: 'Git & GitHub', level: 'Intermediate' },
  ],

  /** Free-form interest tags (strings only, no IDs needed) */
  interests: [
    'Web Development',
    'Data Science',
    'Open Source',
    'UI/UX Design',
    'Competitive Programming',
    'Cloud Computing',
  ],

  /**
   * Up to 3 target career paths.
   * Kept as strings so components can show them as simple ranked cards.
   */
  careerGoals: [
    'Frontend Developer',
    'Full Stack Engineer',
    'Data Analyst',
  ],

  /** Professional / project experience entries */
  experience: [
    {
      id: 'exp-1',
      role: 'Frontend Development Intern',
      organization: 'TechNova Solutions Pvt. Ltd.',
      duration: 'May 2024 – Jul 2024',
      description:
        'Built responsive React components for the admin dashboard, reducing page load time by 30%. Collaborated with the design team to translate Figma prototypes into pixel-perfect UI. Integrated REST APIs and implemented client-side caching.',
    },
    {
      id: 'exp-2',
      role: 'Open Source Contributor',
      organization: 'Mozilla Firefox (DevTools)',
      duration: 'Jan 2024 – Present',
      description:
        'Fixed accessibility and visual regression bugs in the Firefox DevTools CSS Inspector. Merged 4 PRs that improved colour-contrast highlighting in the Rules panel.',
    },
  ],
};

export default dummyProfile;
