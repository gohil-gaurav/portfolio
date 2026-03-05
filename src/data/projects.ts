/**
 * Projects Data
 * Demo project entries for portfolio display
 */

// Import project images
import hrManagementImg from '../assets/images/project/hrmanagement.png';
import rentalHubImg from '../assets/images/project/rentalhub.png';
import studentPredictionImg from '../assets/images/project/studentmarkpredition.png';
import blogNestImg from '../assets/images/project/blognest.png';
import kushiImg from '../assets/images/project/kushi.png';

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
    image: hrManagementImg
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
    image: rentalHubImg
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
    image: studentPredictionImg
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
    image: blogNestImg
  },
  {
    id: 5,
    filename: 'kushi-fashion.html',
    title: 'Kushi - Fashion Blog Website',
    description: 'Elegant fashion blog showcasing latest trends, red carpet looks, and style insights with modern design.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/gohil-gaurav/webpage_kushi',
    liveUrl: 'https://iridescent-starship-c12fa1.netlify.app/',
    status: 'live',
    image: kushiImg
  }
];

export default projects;
