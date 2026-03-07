/**
 * Skills Data
 * Developer-focused skills with categories and descriptions
 */

export type SkillLevel = 'Learning' | 'Intermediate' | 'Proficient';
export type SkillCategory = 'Language' | 'Data Analysis' | 'Visualization' | 'Backend' | 'Frontend' | 'Database' | 'Tools';

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  description: string;
  level: SkillLevel;
}

export const skills: Skill[] = [
  {
    id: 1,
    name: 'Python',
    category: 'Language',
    description: 'Data analysis, automation, backend development',
    level: 'Proficient'
  },
  {
    id: 2,
    name: 'Pandas',
    category: 'Data Analysis',
    description: 'Data manipulation, cleaning, transformation',
    level: 'Proficient'
  },
  {
    id: 3,
    name: 'NumPy',
    category: 'Data Analysis',
    description: 'Numerical computing, array operations',
    level: 'Intermediate'
  },
  {
    id: 4,
    name: 'Matplotlib',
    category: 'Visualization',
    description: 'Charts, graphs, data visualization',
    level: 'Proficient'
  },
  {
    id: 5,
    name: 'Seaborn',
    category: 'Visualization',
    description: 'Statistical data visualization',
    level: 'Intermediate'
  },
  {
    id: 6,
    name: 'Django',
    category: 'Backend',
    description: 'Web applications, REST APIs, admin panels',
    level: 'Learning'
  },
  {
    id: 7,
    name: 'HTML',
    category: 'Frontend',
    description: 'Semantic markup, web structure, accessibility',
    level: 'Proficient'
  },
  {
    id: 8,
    name: 'CSS',
    category: 'Frontend',
    description: 'Responsive design, animations, modern layouts',
    level: 'Proficient'
  },
  {
    id: 9,
    name: 'React',
    category: 'Frontend',
    description: 'UI components, SPAs, modern web apps',
    level: 'Learning'
  },
  {
    id: 10,
    name: 'Git & GitHub',
    category: 'Tools',
    description: 'Version control, collaboration, CI/CD',
    level: 'Proficient'
  },
  {
    id: 11,
    name: 'C',
    category: 'Language',
    description: 'Systems programming, DSA fundamentals',
    level: 'Intermediate'
  },
  {
    id: 12,
    name: 'SQL',
    category: 'Database',
    description: 'Queries, data management, SQLite',
    level: 'Intermediate'
  },
  {
    id: 13,
    name: 'VS Code',
    category: 'Tools',
    description: 'Development environment, extensions',
    level: 'Proficient'
  }
];

export const skillCategories: string[] = [
  'All',
  'Language',
  'Data Analysis',
  'Visualization',
  'Backend',
  'Frontend',
  'Database',
  'Tools'
];

export default skills;
