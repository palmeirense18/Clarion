export type ProjectCategory = 'SaaS' | 'Site';

export interface Project {
  id: string;
  name: string;
  client: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  url: string | null;
  year: number;
  image: string;
}

export const projects: Project[] = [
  {
    id: '01',
    name: 'Busca Busca',
    client: 'Pinnacle, Icy Gelatos e outros',
    category: 'SaaS',
    description: 'Um buscador de leads automatizado para sua operação.',
    stack: ['Next.js', 'Tailwind', 'React', 'Node.js', 'NestJS'],
    url: null,
    year: 2025,
    image: '/projetos/busca-busca.png',
  },
  {
    id: '02',
    name: 'Dashboard Pinnacle',
    client: 'Pinnacle',
    category: 'SaaS',
    description: 'Dashboard para organização e automatização das tarefas da empresa.',
    stack: ['Next.js', 'Tailwind', 'React', 'Node.js', 'NestJS'],
    url: null,
    year: 2026,
    image: '/projetos/dashboard-pinnacle.png',
  },
  {
    id: '03',
    name: 'Postador',
    client: 'Conecta Blog',
    category: 'SaaS',
    description: 'Sistema feito para postagem automática de posts para blogs.',
    stack: ['Next.js', 'Tailwind', 'React', 'Node.js', 'NestJS'],
    url: null,
    year: 2026,
    image: '/projetos/postador-conecta.png',
  },
  {
    id: '04',
    name: 'Chat CPlus',
    client: 'Conecta Blog',
    category: 'Site',
    description: 'Site sob medida para o Chat CPlus.',
    stack: ['Next.js', 'Tailwind', 'React', 'Node.js', 'NestJS'],
    url: 'https://chat.cplus5.com.br/',
    year: 2025,
    image: '/projetos/chat-cplus.png',
  },
  {
    id: '05',
    name: 'Gestonauta',
    client: 'Gestonauta',
    category: 'Site',
    description: 'Site sob medida para a empresa Gestonauta.',
    stack: ['Next.js', 'Tailwind', 'React', 'Node.js', 'NestJS'],
    url: 'https://gestonauta.com.br/emissor',
    year: 2025,
    image: '/projetos/gestonauta.png',
  },
  {
    id: '06',
    name: 'Conecta Blogs',
    client: 'Conecta Blogs',
    category: 'Site',
    description: 'Site sob medida para a empresa Conecta Blogs.',
    stack: ['Next.js', 'Tailwind', 'React', 'Node.js', 'NestJS'],
    url: 'https://conectablog.com/',
    year: 2025,
    image: '/projetos/conecta-blog.png',
  },
];

export const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  SaaS: '#0057FF',
  Site: '#FF7A00',
};
