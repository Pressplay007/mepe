export interface Project {
  id: string;
  title: string;
  category: string;
  status: 'In Progress' | 'Completed' | 'Planned';
  progress: number; // 0 to 100
  description: string;
  lead: string;
  budget?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'MDA Office Complex',
    category: 'Infrastructure',
    status: 'In Progress',
    progress: 65,
    description: 'Construction of a multi-purpose administrative hub featuring an ICT center, library, and conference hall.',
    lead: 'Michael Fosu',
    budget: 'GHS 150,000'
  },
  {
    id: '2',
    title: 'Fish Farming Training Farm',
    category: 'Agriculture',
    status: 'Completed',
    progress: 100,
    description: 'Establishment of a practical training center for youth to learn modern aquaculture techniques.',
    lead: 'Bismark Fiifi Tetteh',
    budget: 'GHS 45,000'
  },
  {
    id: '3',
    title: 'Heritage Park & Museum',
    category: 'Tourism',
    status: 'Planned',
    progress: 15,
    description: 'A multi-phase project combining a cultural museum, village, and craft markets to preserve Mepe heritage.',
    lead: 'Francis Ladzaglah',
    budget: 'GHS 200,000'
  },
  {
    id: '4',
    title: 'Scholarship Fund 2026',
    category: 'Education',
    status: 'In Progress',
    progress: 40,
    description: 'Fundraising and distribution of financial support for tertiary and technical students.',
    lead: 'Anna Enyonam Awuku',
    budget: 'GHS 30,000'
  },
  {
    id: '5',
    title: 'Local Business Cooperative',
    category: 'Economic',
    status: 'In Progress',
    progress: 80,
    description: 'Creating a bulk buying system and financial training network for local traders.',
    lead: 'Christiana Dziedzorm Kwadzoti',
    budget: 'GHS 10,000'
  }
];
