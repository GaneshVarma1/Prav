// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  created_at: string;
  updated_at: string;
}

// Record types
export interface Record {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  data?: any;
  status: 'active' | 'inactive' | 'deleted';
  created_at: string;
  updated_at: string;
}

// Session types
export interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: string;
  created_at: string;
}

// Audit log types
export interface AuditLog {
  id: string;
  record_id?: string;
  user_id: string;
  action: string;
  old_data?: any;
  new_data?: any;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// Dashboard types
export interface DashboardMetrics {
  totalRecords: number;
  activeRecords: number;
  totalUsers: number;
  recentActivity: AuditLog[];
}

// Form types
export interface RecordFormData {
  title: string;
  description?: string;
  data?: any;
  status: 'active' | 'inactive';
}

// Table types
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface TableFilter {
  key: string;
  value: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith';
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Navigation types
export interface NavItem {
  title: string;
  url: string;
  icon?: any;
  isActive?: boolean;
  items?: NavItem[];
}