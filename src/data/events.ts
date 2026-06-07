export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: 'Cultural' | 'Educational' | 'Community' | 'Youth';
  status: 'Upcoming' | 'Past' | 'Ongoing';
  description: string;
  image?: string;
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Afenorto Festival',
    date: 'August 2026',
    location: 'Mepe Traditional Area',
    category: 'Cultural',
    status: 'Upcoming',
    description: 'The annual Afenorto Festival celebrating the homecoming and heritage of the Mepe people.',
  },
  {
    id: '2',
    title: 'Annual General Meeting',
    date: 'June 15, 2026',
    location: 'Mepe Community Centre',
    category: 'Community',
    status: 'Upcoming',
    description: 'Meeting of all MDA members to discuss the progress and future plans for the community.',
  },
  {
    id: '3',
    title: 'Inter-School Cultural Quiz',
    date: 'July 10, 2026',
    location: 'Vitting SHS Hall',
    category: 'Educational',
    status: 'Upcoming',
    description: 'A competition between local schools to promote cultural awareness and academic excellence.',
  },
  {
    id: '4',
    title: 'Youth Leadership Workshop',
    date: 'May 20, 2026',
    location: 'MDA Secretariat',
    category: 'Youth',
    status: 'Ongoing',
    description: 'Empowering the youth with leadership skills and community development strategies.',
  }
];
