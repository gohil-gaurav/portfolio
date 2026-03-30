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
import bankManagementImg from '../assets/images/project/bankmanagment.png';
import movieRecommendationImg from '../assets/images/project/MovieRecommendation.png';

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
  tags: string[];
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
    image: hrManagementImg,
    tags: ['Hackathon']
  },
  {
    id: 2,
    filename: 'movie-recommendation.py',
    title: 'Movie Recommendation System',
    description: 'CineVault is a full-stack AI-powered movie recommendation platform that suggests similar movies using a content-based machine learning model built with TF-IDF and cosine similarity.',
    techStack: ['Python', 'FastAPI', 'React', 'Pandas', 'NumPy', 'Scikit-Learn', 'Jupyter Notebook'],
    githubUrl: 'https://github.com/gohil-gaurav/Movie-Recommendation-System',
    liveUrl: 'https://cinevault-black.vercel.app/',
    status: 'live',
    image: movieRecommendationImg,
    tags: ['ML']
  },
  {
    id: 3,
    filename: 'bank-system.py',
    title: 'Bank Management System',
    description: 'Comprehensive banking system with account management, transactions, loan processing, and customer portal.',
    techStack: ['Django', 'Python', 'SQLite', 'HTML', 'CSS', 'Bootstrap'],
    githubUrl: 'https://github.com/gohil-gaurav/BankManagementSystem',
    liveUrl: 'https://bankmanagement.pythonanywhere.com/users/',
    status: 'live',
    image: bankManagementImg,
    tags: ['Django']
  },
  {
    id: 4,
    filename: 'rentalhub.tsx',
    title: 'RentalHub',
    description: 'Comprehensive rental management platform for landlords and tenants with property listings and booking features.',
    techStack: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
    githubUrl: 'https://github.com/gohil-gaurav/RentalManagementSystem',
    liveUrl: 'https://rental-management-system-nine.vercel.app/',
    status: 'live',
    image: rentalHubImg,
    tags: ['Hackathon']
  },
  {
    id: 5,
    filename: 'student-predictor.py',
    title: 'Student Performance Predictor',
    description: 'ML web app predicting exam scores based on study habits and lifestyle factors.',
    techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Streamlit', 'Matplotlib', 'Seaborn'],
    githubUrl: 'https://github.com/gohil-gaurav/student-performance-predictor',
    liveUrl: 'https://student-performance-predictor01.streamlit.app/',
    status: 'live',
    image: studentPredictionImg,
    tags: ['ML']
  },
  {
    id: 6,
    filename: 'blognest.py',
    title: 'BlogNest',
    description: 'Full-featured blog platform with role-based access, authentication, categories, comments, and search functionality.',
    techStack: ['Django', 'Python', 'SQLite', 'HTML/CSS', 'Bootstrap'],
    githubUrl: 'https://github.com/gohil-gaurav/blognest',
    liveUrl: 'https://gaurav89.pythonanywhere.com/',
    status: 'live',
    image: blogNestImg,
    tags: ['Django']
  },
  {
    id: 7,
    filename: 'kushi-fashion.html',
    title: 'Kushi - Fashion Blog Website',
    description: 'Elegant fashion blog showcasing latest trends, red carpet looks, and style insights with modern design.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/gohil-gaurav/webpage_kushi',
    liveUrl: 'https://iridescent-starship-c12fa1.netlify.app/',
    status: 'live',
    image: kushiImg,
    tags: ['Web']
  }
];

export default projects;
