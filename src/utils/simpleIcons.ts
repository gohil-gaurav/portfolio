const SIMPLE_ICON_SLUGS: Record<string, string> = {
  'Python': 'python',
  'FastAPI': 'fastapi',
  'React': 'react',
  'Pandas': 'pandas',
  'NumPy': 'numpy',
  'Scikit-Learn': 'scikitlearn',
  'Jupyter Notebook': 'jupyter',
  'Django': 'django',
  'SQLite': 'sqlite',
  'HTML': 'html5',
  'HTML/CSS': 'html5',
  'CSS': 'css',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'Tailwind': 'tailwindcss',
  'Next.js': 'nextdotjs',
  'PostgreSQL': 'postgresql',
  'Prisma': 'prisma',
  'NextAuth': 'betterauth',
  'Radix UI': 'radixui',
  'Bootstrap': 'bootstrap',
  'Streamlit': 'streamlit',
  'Matplotlib': 'simpleicons',
  'Seaborn': 'simpleicons',
  'Vite': 'vite',
  'Git': 'git',
  'C': 'c',
  'GitHub': 'github',
  'LinkedIn': 'linkedin',
  'X': 'x',
  'Twitter': 'x',
  'X (Twitter)': 'x',
  'simpleicons': 'simpleicons'
};

const WHITE_SIMPLE_ICON_NAMES = new Set<string>([
  'Next.js',
  'NextAuth',
  'Radix UI',
  'GitHub',
  'X',
  'Twitter',
  'X (Twitter)'
]);

export const shouldUseWhiteSimpleIcon = (iconName: string): boolean => WHITE_SIMPLE_ICON_NAMES.has(iconName);

export const getSimpleIconUrl = (iconName: string, forceWhite?: boolean): string => {
  const slug = SIMPLE_ICON_SLUGS[iconName]
    || iconName.toLowerCase().replace(/\+/g, 'plus').replace(/\./g, 'dot').replace(/\s*\/\s*/g, '').replace(/[^a-z0-9]/g, '');

  const white = typeof forceWhite === 'boolean' ? forceWhite : shouldUseWhiteSimpleIcon(iconName);
  const colorSuffix = white ? '/ffffff' : '';

  return `https://cdn.simpleicons.org/${slug}${colorSuffix}`;
};
