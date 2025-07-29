export interface Badge {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  icon: string;
}

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Eco Warrior',
    description: 'Completed 10 successful freecycle transactions',
    pointsRequired: 50,
    icon: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Community Helper',
    description: 'Helped 5 community members find items they needed',
    pointsRequired: 25,
    icon: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Tech Savvy',
    description: 'Successfully shared 5 electronic items',
    pointsRequired: 30,
    icon: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Night Owl',
    description: 'Active contributor during evening hours',
    pointsRequired: 20,
    icon: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Green Thumb',
    description: 'Shared 3 garden or plant-related items',
    pointsRequired: 15,
    icon: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80'
  }
];