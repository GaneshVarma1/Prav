import { User, Record, DashboardMetrics, AuditLog } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
  },
];

// Mock Records
export const mockRecords: Record[] = [
  {
    id: 'record-1',
    user_id: 'user-1',
    title: 'Sample Record 1',
    description: 'This is a sample record for testing purposes',
    data: { category: 'test', priority: 'high', tags: ['important', 'demo'] },
    status: 'active',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z',
  },
  {
    id: 'record-2',
    user_id: 'user-2',
    title: 'Sample Record 2',
    description: 'Another sample record with different data',
    data: { category: 'demo', priority: 'medium', tags: ['sample', 'test'] },
    status: 'active',
    created_at: '2024-01-02T10:00:00Z',
    updated_at: '2024-01-02T10:00:00Z',
  },
  {
    id: 'record-3',
    user_id: 'user-1',
    title: 'Inactive Record',
    description: 'This record is currently inactive',
    data: { category: 'archive', priority: 'low', tags: ['archived'] },
    status: 'inactive',
    created_at: '2024-01-03T10:00:00Z',
    updated_at: '2024-01-03T10:00:00Z',
  },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit-1',
    record_id: 'record-1',
    user_id: 'user-1',
    action: 'CREATE',
    new_data: mockRecords[0],
    created_at: '2024-01-01T10:00:00Z',
  },
  {
    id: 'audit-2',
    record_id: 'record-2',
    user_id: 'user-2',
    action: 'CREATE',
    new_data: mockRecords[1],
    created_at: '2024-01-02T10:00:00Z',
  },
  {
    id: 'audit-3',
    record_id: 'record-1',
    user_id: 'user-1',
    action: 'UPDATE',
    old_data: { ...mockRecords[0], description: 'Old description' },
    new_data: mockRecords[0],
    created_at: '2024-01-01T15:00:00Z',
  },
];

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalRecords: mockRecords.length,
  activeRecords: mockRecords.filter(r => r.status === 'active').length,
  totalUsers: mockUsers.length,
  recentActivity: mockAuditLogs.slice(0, 5),
};

// Utility function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  // Auth
  login: async (email: string, password: string) => {
    await delay(1000);
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      return {
        success: true,
        token: 'mock-jwt-token',
        user,
      };
    }
    throw new Error('Invalid credentials');
  },

  // Records
  getRecords: async () => {
    await delay(500);
    return mockRecords;
  },

  getRecord: async (id: string) => {
    await delay(300);
    const record = mockRecords.find(r => r.id === id);
    if (!record) throw new Error('Record not found');
    return record;
  },

  createRecord: async (data: Omit<Record, 'id' | 'created_at' | 'updated_at'>) => {
    await delay(800);
    const newRecord: Record = {
      ...data,
      id: `record-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockRecords.push(newRecord);
    return newRecord;
  },

  updateRecord: async (id: string, data: Partial<Record>) => {
    await delay(800);
    const index = mockRecords.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Record not found');
    
    mockRecords[index] = {
      ...mockRecords[index],
      ...data,
      updated_at: new Date().toISOString(),
    };
    return mockRecords[index];
  },

  deleteRecord: async (id: string) => {
    await delay(500);
    const index = mockRecords.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Record not found');
    
    mockRecords.splice(index, 1);
    return { success: true };
  },

  // Dashboard
  getDashboardMetrics: async () => {
    await delay(600);
    return {
      ...mockDashboardMetrics,
      totalRecords: mockRecords.length,
      activeRecords: mockRecords.filter(r => r.status === 'active').length,
    };
  },

  // Users
  getCurrentUser: async () => {
    await delay(300);
    return mockUsers[0]; // Return admin user as current user
  },

  updateProfile: async (data: Partial<User>) => {
    await delay(800);
    const user = { ...mockUsers[0], ...data, updated_at: new Date().toISOString() };
    mockUsers[0] = user;
    return user;
  },
};