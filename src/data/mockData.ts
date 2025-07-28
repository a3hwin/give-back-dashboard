export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  itemCount: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  datePosted: string;
  status: 'Listed' | 'Requested' | 'Freecycled';
  donorName: string;
  requestCount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  points: number;
  itemsGiven: number;
  itemsReceived: number;
  joinDate: string;
  badges: string[];
}

export interface Transaction {
  id: string;
  itemName: string;
  donor: string;
  recipient: string;
  category: string;
  points: number;
  date: string;
  status: 'Completed' | 'In Progress' | 'Cancelled';
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLogin: string;
  permissions: string[];
}

export const mockCategories: Category[] = [
  {
    id: '1',
    title: 'Furniture',
    description: 'Tables, chairs, sofas, and other household furniture',
    icon: '🪑',
    points: 5,
    itemCount: 142
  },
  {
    id: '2',
    title: 'Electronics',
    description: 'Phones, laptops, gadgets, and electronic devices',
    icon: '📱',
    points: 8,
    itemCount: 89
  },
  {
    id: '3',
    title: 'Books',
    description: 'Novels, textbooks, magazines, and educational materials',
    icon: '📚',
    points: 2,
    itemCount: 234
  },
  {
    id: '4',
    title: 'Clothing',
    description: 'Shirts, pants, dresses, shoes, and accessories',
    icon: '👕',
    points: 3,
    itemCount: 167
  },
  {
    id: '5',
    title: 'Kitchen',
    description: 'Cookware, utensils, appliances, and kitchen supplies',
    icon: '🍳',
    points: 4,
    itemCount: 98
  },
  {
    id: '6',
    title: 'Toys & Games',
    description: 'Children toys, board games, and entertainment items',
    icon: '🧸',
    points: 3,
    itemCount: 76
  }
];

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Wooden Dining Table',
    description: 'Beautiful oak dining table, seats 6 people. Minor scratches but very sturdy.',
    category: 'Furniture',
    location: 'San Francisco, CA',
    datePosted: '2024-01-15',
    status: 'Listed',
    donorName: 'Sarah Chen',
    requestCount: 3
  },
  {
    id: '2',
    name: 'iPhone 12 Pro',
    description: 'Excellent condition iPhone 12 Pro, 128GB. Includes charger and case.',
    category: 'Electronics',
    location: 'New York, NY',
    datePosted: '2024-01-14',
    status: 'Requested',
    donorName: 'Mike Johnson',
    requestCount: 8
  },
  {
    id: '3',
    name: 'Harry Potter Collection',
    description: 'Complete set of Harry Potter books in great condition.',
    category: 'Books',
    location: 'Austin, TX',
    datePosted: '2024-01-12',
    status: 'Freecycled',
    donorName: 'Emma Wilson'
  },
  {
    id: '4',
    name: 'Winter Jacket',
    description: 'Warm winter jacket, size L. Gently used, perfect for cold weather.',
    category: 'Clothing',
    location: 'Seattle, WA',
    datePosted: '2024-01-10',
    status: 'Listed',
    donorName: 'Alex Rodriguez',
    requestCount: 2
  },
  {
    id: '5',
    name: 'Coffee Maker',
    description: 'Automatic drip coffee maker, works perfectly. Great for morning coffee.',
    category: 'Kitchen',
    location: 'Portland, OR',
    datePosted: '2024-01-09',
    status: 'Freecycled',
    donorName: 'Lisa Park'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    location: 'San Francisco, CA',
    points: 127,
    itemsGiven: 23,
    itemsReceived: 8,
    joinDate: '2023-08-15',
    badges: ['Top Giver', 'Eco Warrior', 'Community Star']
  },
  {
    id: '2',
    name: 'Mike Johnson',
    email: 'mike.j@email.com',
    location: 'New York, NY',
    points: 98,
    itemsGiven: 18,
    itemsReceived: 12,
    joinDate: '2023-09-22',
    badges: ['Helpful Neighbor', 'Green Hero']
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    location: 'Austin, TX',
    points: 156,
    itemsGiven: 31,
    itemsReceived: 5,
    joinDate: '2023-07-10',
    badges: ['Super Giver', 'Eco Warrior', 'Community Star', 'Green Champion']
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    email: 'alex.r@email.com',
    location: 'Seattle, WA',
    points: 89,
    itemsGiven: 16,
    itemsReceived: 9,
    joinDate: '2023-10-05',
    badges: ['Helpful Neighbor']
  },
  {
    id: '5',
    name: 'Lisa Park',
    email: 'lisa.park@email.com',
    location: 'Portland, OR',
    points: 134,
    itemsGiven: 25,
    itemsReceived: 7,
    joinDate: '2023-06-18',
    badges: ['Top Giver', 'Green Hero', 'Community Star']
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    itemName: 'Wooden Dining Table',
    donor: 'Sarah Chen',
    recipient: 'John Doe',
    category: 'Furniture',
    points: 5,
    date: '2024-01-15',
    status: 'Completed'
  },
  {
    id: '2',
    itemName: 'iPhone 12 Pro',
    donor: 'Mike Johnson',
    recipient: 'Jane Smith',
    category: 'Electronics',
    points: 8,
    date: '2024-01-14',
    status: 'In Progress'
  },
  {
    id: '3',
    itemName: 'Harry Potter Collection',
    donor: 'Emma Wilson',
    recipient: 'Tom Brown',
    category: 'Books',
    points: 2,
    date: '2024-01-12',
    status: 'Completed'
  }
];

export const mockAdmins: Admin[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@passiton.com',
    role: 'Super Admin',
    lastLogin: '2024-01-15 09:30:00',
    permissions: ['All']
  },
  {
    id: '2',
    username: 'moderator1',
    email: 'mod1@passiton.com',
    role: 'Moderator',
    lastLogin: '2024-01-14 15:45:00',
    permissions: ['Categories', 'Items', 'Users']
  },
  {
    id: '3',
    username: 'support',
    email: 'support@passiton.com',
    role: 'Support',
    lastLogin: '2024-01-13 11:20:00',
    permissions: ['Transactions', 'Users']
  }
];

export const getStatsData = () => ({
  totalUsers: mockUsers.length,
  totalItems: mockItems.length,
  totalTransactions: mockTransactions.length,
  categoryStats: mockCategories.map(cat => ({
    name: cat.title,
    items: cat.itemCount,
    points: cat.points
  })),
  itemsByStatus: {
    Listed: mockItems.filter(item => item.status === 'Listed').length,
    Requested: mockItems.filter(item => item.status === 'Requested').length,
    Freecycled: mockItems.filter(item => item.status === 'Freecycled').length
  }
});