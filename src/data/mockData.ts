export interface SubCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  points: number;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  points: number;
  itemCount: number;
  subCategories?: SubCategory[];
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
  image?: string;
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
    description: 'Tables, chairs, sofas, and other home furniture',
    image: 'https://images.unsplash.com/photo-1721322800607-80112131f5a1?auto=format&fit=crop&w=800&q=80',
    points: 5,
    itemCount: 12,
    subCategories: [
      {
        id: '1-1',
        title: 'Indoor Furniture',
        description: 'Living room, bedroom, and office furniture',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
        points: 5
      },
      {
        id: '1-2',
        title: 'Outdoor Furniture',
        description: 'Patio, garden, and outdoor seating',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80',
        points: 6
      }
    ]
  },
  {
    id: '2',
    title: 'Electronics',
    description: 'Phones, laptops, tablets, and electronic gadgets',
    image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80',
    points: 8,
    itemCount: 8,
    subCategories: [
      {
        id: '2-1',
        title: 'Mobile Devices',
        description: 'Phones, tablets, and accessories',
        image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80',
        points: 10
      },
      {
        id: '2-2',
        title: 'Computers',
        description: 'Laptops, desktops, and peripherals',
        image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80',
        points: 12
      }
    ]
  },
  {
    id: '3',
    title: 'Books',
    description: 'Educational books, novels, magazines, and publications',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
    points: 2,
    itemCount: 15
  },
  {
    id: '4',
    title: 'Clothing',
    description: 'Shirts, pants, dresses, shoes, and accessories',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
    points: 3,
    itemCount: 20
  },
  {
    id: '5',
    title: 'Kitchen Items',
    description: 'Utensils, appliances, cookware, and kitchen accessories',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
    points: 4,
    itemCount: 10
  },
  {
    id: '6',
    title: 'Sports Equipment',
    description: 'Exercise gear, sports equipment, and outdoor activities',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80',
    points: 6,
    itemCount: 7
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
    requestCount: 3,
    image: 'https://images.unsplash.com/photo-1721322800607-80112131f5a1?auto=format&fit=crop&w=800&q=80'
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
    requestCount: 8,
    image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Harry Potter Collection',
    description: 'Complete set of Harry Potter books in great condition.',
    category: 'Books',
    location: 'Austin, TX',
    datePosted: '2024-01-12',
    status: 'Freecycled',
    donorName: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80'
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
    requestCount: 2,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Coffee Maker',
    description: 'Automatic drip coffee maker, works perfectly. Great for morning coffee.',
    category: 'Kitchen Items',
    location: 'Portland, OR',
    datePosted: '2024-01-09',
    status: 'Freecycled',
    donorName: 'Lisa Park',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80'
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