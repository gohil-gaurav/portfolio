/**
 * Projects Data
 * Demo project entries for portfolio display
 */

export type ProjectStatus = 'coming-soon' | 'building' | 'live';

export interface Project {
  id: number;
  filename: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  status: ProjectStatus;
  image: string | null;
}

export const projects: Project[] = [
  {
    id: 1,
    filename: 'dayflow-hr.tsx',
    title: 'DayFlow - HR Management System',
    description: 'Modern HR system with employee management, attendance tracking, leave management, and payroll processing.',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'NextAuth', 'Tailwind', 'Radix UI'],
    githubUrl: 'https://github.com/gohil-gaurav/hr_management_odoo',
    liveUrl: 'https://hr-management-odoo-rose.vercel.app/',
    status: 'live',
    image: '/src/assets/images/project/hrmanagement.png'
  },
  {
    id: 2,
    filename: 'rentalhub.tsx',
    title: 'RentalHub - Property Management System',
    description: 'Comprehensive rental management platform for landlords and tenants with property listings and booking features.',
    techStack: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
    githubUrl: 'https://github.com/gohil-gaurav/RentalManagementSystem',
    liveUrl: 'https://rental-management-system-nine.vercel.app/',
    status: 'live',
    image: '/src/assets/images/project/rentalhub.png'
  },
  {
    id: 3,
    filename: 'student-predictor.py',
    title: 'Student Performance Predictor',
    description: 'ML web app predicting exam scores based on study habits and lifestyle factors.',
    techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Streamlit', 'Matplotlib', 'Seaborn'],
    githubUrl: 'https://github.com/gohil-gaurav/student-performance-predictor',
    liveUrl: 'https://student-performance-predictor01.streamlit.app/',
    status: 'live',
    image: '/src/assets/images/project/studentmarkpredition.png'
  },
  {
    id: 4,
    filename: 'blognest.py',
    title: 'BlogNest - Multi-Role Blog System',
    description: 'Full-featured blog platform with role-based access, authentication, categories, comments, and search functionality.',
    techStack: ['Django', 'Python', 'SQLite', 'HTML/CSS', 'Bootstrap'],
    githubUrl: 'https://github.com/gohil-gaurav/blognest',
    liveUrl: 'https://gaurav89.pythonanywhere.com/',
    status: 'live',
    image: '/src/assets/images/project/blognest.png'
  }
];

export default projects;
