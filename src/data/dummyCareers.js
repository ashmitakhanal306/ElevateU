/**
 * dummyCareers.js — Static seed data for the Career Recommendation Engine.
 *
 * Each career defines matching interests and required skills, which are
 * used by the scoring algorithm to determine the match percentage.
 */

const dummyCareers = [
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    category: 'Technical',
    description: 'Build user-facing web applications focusing on performance and UI/UX.',
    matchingInterests: ['Web Development', 'UI/UX Design', 'Design Systems', 'Open Source'],
    requiredSkills: [
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'React.js', level: 'Intermediate' },
      { name: 'Tailwind CSS', level: 'Intermediate' },
      { name: 'Git & GitHub', level: 'Beginner' }
    ],
    avgSalaryRange: '₹6-14 LPA',
    growthOutlook: 'High'
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    category: 'Technical',
    description: 'Design robust APIs, manage databases, and ensure server performance.',
    matchingInterests: ['Web Development', 'System Design', 'Cloud Computing', 'Databases'],
    requiredSkills: [
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'SQL', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'Git & GitHub', level: 'Intermediate' }
    ],
    avgSalaryRange: '₹8-16 LPA',
    growthOutlook: 'High'
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    description: 'Analyze data sets to uncover trends and provide actionable business insights.',
    matchingInterests: ['Data Science', 'Business Intelligence', 'Statistics'],
    requiredSkills: [
      { name: 'SQL', level: 'Advanced' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'Data Visualization', level: 'Intermediate' }
    ],
    avgSalaryRange: '₹5-12 LPA',
    growthOutlook: 'High'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    description: 'Apply machine learning models and predictive analytics to solve complex problems.',
    matchingInterests: ['Data Science', 'Machine Learning', 'Artificial Intelligence', 'Mathematics'],
    requiredSkills: [
      { name: 'Python', level: 'Advanced' },
      { name: 'Machine Learning', level: 'Intermediate' },
      { name: 'SQL', level: 'Intermediate' }
    ],
    avgSalaryRange: '₹10-22 LPA',
    growthOutlook: 'High'
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design',
    description: 'Design intuitive, accessible, and aesthetically pleasing digital experiences.',
    matchingInterests: ['UI/UX Design', 'Human-Computer Interaction', 'Graphic Design'],
    requiredSkills: [
      { name: 'Figma', level: 'Advanced' },
      { name: 'Prototyping', level: 'Intermediate' },
      { name: 'User Research', level: 'Intermediate' }
    ],
    avgSalaryRange: '₹5-14 LPA',
    growthOutlook: 'Medium'
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Management',
    description: 'Lead cross-functional teams to define and deliver successful products.',
    matchingInterests: ['Product Management', 'Leadership', 'Business Strategy'],
    requiredSkills: [
      { name: 'Agile Methodology', level: 'Intermediate' },
      { name: 'Data Analysis', level: 'Beginner' },
      { name: 'Communication', level: 'Advanced' }
    ],
    avgSalaryRange: '₹12-25 LPA',
    growthOutlook: 'High'
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    category: 'Marketing',
    description: 'Drive online growth through SEO, content marketing, and paid campaigns.',
    matchingInterests: ['Marketing', 'SEO', 'Content Creation', 'Social Media'],
    requiredSkills: [
      { name: 'SEO/SEM', level: 'Intermediate' },
      { name: 'Google Analytics', level: 'Intermediate' },
      { name: 'Copywriting', level: 'Beginner' }
    ],
    avgSalaryRange: '₹4-10 LPA',
    growthOutlook: 'Medium'
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Technical',
    description: 'Automate deployment pipelines and manage scalable cloud infrastructure.',
    matchingInterests: ['Cloud Computing', 'System Architecture', 'Automation', 'Open Source'],
    requiredSkills: [
      { name: 'Linux', level: 'Intermediate' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'AWS / Azure', level: 'Intermediate' },
      { name: 'CI/CD', level: 'Beginner' }
    ],
    avgSalaryRange: '₹9-18 LPA',
    growthOutlook: 'High'
  }
];

export default dummyCareers;
