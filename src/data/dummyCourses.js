/**
 * dummyCourses.js — Static seed data for the Courses and Certifications feature.
 */

const dummyCourses = [
  {
    id: 'course-1',
    title: 'React - The Complete Guide',
    provider: 'Udemy',
    type: 'Course',
    skillsTaught: ['React.js', 'JavaScript', 'State Management'],
    durationWeeks: 6,
    level: 'Intermediate',
    rating: 4.8,
    url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/'
  },
  {
    id: 'course-2',
    title: 'Advanced CSS and Sass',
    provider: 'Udemy',
    type: 'Course',
    skillsTaught: ['CSS', 'Sass', 'Responsive Design'],
    durationWeeks: 4,
    level: 'Advanced',
    rating: 4.7,
    url: 'https://www.udemy.com/course/advanced-css-and-sass-flexbox-grid-sass-animations/'
  },
  {
    id: 'cert-1',
    title: 'AWS Certified Cloud Practitioner',
    provider: 'Coursera',
    type: 'Certification',
    skillsTaught: ['Cloud Computing', 'AWS', 'System Architecture'],
    durationWeeks: 4,
    level: 'Beginner',
    rating: 4.6,
    url: 'https://www.coursera.org/learn/aws-cloud-practitioner-essentials'
  },
  {
    id: 'course-3',
    title: 'The Complete Node.js Developer Course',
    provider: 'Udemy',
    type: 'Course',
    skillsTaught: ['Node.js', 'Express', 'MongoDB'],
    durationWeeks: 8,
    level: 'Intermediate',
    rating: 4.7,
    url: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/'
  },
  {
    id: 'course-4',
    title: 'Python for Data Science and Machine Learning',
    provider: 'Coursera',
    type: 'Course',
    skillsTaught: ['Python', 'Machine Learning', 'Data Analysis'],
    durationWeeks: 10,
    level: 'Intermediate',
    rating: 4.9,
    url: 'https://www.coursera.org/learn/python-for-applied-data-science-ai'
  },
  {
    id: 'cert-2',
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Coursera',
    type: 'Certification',
    skillsTaught: ['Data Analysis', 'SQL', 'R', 'Tableau'],
    durationWeeks: 24,
    level: 'Beginner',
    rating: 4.8,
    url: 'https://www.coursera.org/professional-certificates/google-data-analytics'
  },
  {
    id: 'course-5',
    title: 'Mastering Git and GitHub',
    provider: 'LinkedIn Learning',
    type: 'Course',
    skillsTaught: ['Git & GitHub', 'Version Control', 'CI/CD'],
    durationWeeks: 2,
    level: 'Intermediate',
    rating: 4.5,
    url: 'https://www.linkedin.com/learning/git-essential-training-14227914'
  },
  {
    id: 'cert-3',
    title: 'Meta Front-End Developer Professional Certificate',
    provider: 'Coursera',
    type: 'Certification',
    skillsTaught: ['JavaScript', 'React.js', 'UI/UX Design'],
    durationWeeks: 28,
    level: 'Beginner',
    rating: 4.7,
    url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer'
  },
  {
    id: 'course-6',
    title: 'Complete SQL Bootcamp',
    provider: 'Udemy',
    type: 'Course',
    skillsTaught: ['SQL', 'Database Design', 'PostgreSQL'],
    durationWeeks: 4,
    level: 'Beginner',
    rating: 4.6,
    url: 'https://www.udemy.com/course/the-complete-sql-bootcamp/'
  },
  {
    id: 'course-7',
    title: 'Figma UI UX Design Essentials',
    provider: 'edX',
    type: 'Course',
    skillsTaught: ['Figma', 'UI/UX Design', 'Prototyping'],
    durationWeeks: 3,
    level: 'Beginner',
    rating: 4.8,
    url: 'https://www.udemy.com/course/figma-ux-ui-design-user-experience-tutorial-course/'
  }
];

export default dummyCourses;
