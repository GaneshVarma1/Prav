import { create } from 'zustand';
import { Record, RecordFormData, PaginationInfo, TableFilter } from '../types';
import { mockApi } from '../services/mockData';

interface RecordsState {
  records: Record[];
  currentRecord: Record | null;
  isLoading: boolean;
  pagination: PaginationInfo;
  filters: TableFilter[];
  searchQuery: string;
  
  // Actions
  fetchRecords: () => Promise<void>;
  fetchRecord: (id: string) => Promise<void>;
  createRecord: (data: RecordFormData) => Promise<void>;
  updateRecord: (id: string, data: Partial<Record>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: TableFilter[]) => void;
  setPagination: (pagination: Partial<PaginationInfo>) => void;
  clearCurrentRecord: () => void;
}

export const useRecordsStore = create<RecordsState>((set, get) => ({
  records: [],
  currentRecord: null,
  isLoading: false,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: [],
  searchQuery: '',

  fetchRecords: async () => {
    set({ isLoading: true });
    try {
      const records = await mockApi.getRecords();
      const { searchQuery, filters } = get();
      
      // Apply search and filters
      let filteredRecords = records;
      
      if (searchQuery) {
        filteredRecords = filteredRecords.filter(record =>
          record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (filters.length > 0) {
        filteredRecords = filteredRecords.filter(record => {
          return filters.every(filter => {
            const value = record[filter.key as keyof Record];
            if (typeof value === 'string') {
              switch (filter.operator) {
                case 'equals':
                  return value === filter.value;
                case 'contains':
                  return value.toLowerCase().includes(filter.value.toLowerCase());
                case 'startsWith':
                  return value.toLowerCase().startsWith(filter.value.toLowerCase());
                case 'endsWith':
                  return value.toLowerCase().endsWith(filter.value.toLowerCase());
                default:
                  return true;
              }
            }
            return true;
          });
        });
      }
      
      const { page, limit } = get().pagination;
      const total = filteredRecords.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const paginatedRecords = filteredRecords.slice(startIndex, startIndex + limit);
      
      set({
        records: paginatedRecords,
        pagination: { page, limit, total, totalPages },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchRecord: async (id: string) => {
    set({ isLoading: true });
    try {
      const record = await mockApi.getRecord(id);
      set({ currentRecord: record, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createRecord: async (data: RecordFormData) => {
    set({ isLoading: true });
    try {
      const newRecord = await mockApi.createRecord({
        ...data,
        user_id: 'user-1', // Mock current user ID
      });
      
      // Refresh records list
      await get().fetchRecords();
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateRecord: async (id: string, data: Partial<Record>) => {
    set({ isLoading: true });
    try {
      const updatedRecord = await mockApi.updateRecord(id, data);
      set({ currentRecord: updatedRecord });
      
      // Refresh records list
      await get().fetchRecords();
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deleteRecord: async (id: string) => {
    set({ isLoading: true });
    try {
      await mockApi.deleteRecord(id);
      
      // Refresh records list
      await get().fetchRecords();
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    // Auto-refresh when search changes
    get().fetchRecords();
  },

  setFilters: (filters: TableFilter[]) => {
    set({ filters });
    // Auto-refresh when filters change
    get().fetchRecords();
  },

  setPagination: (pagination: Partial<PaginationInfo>) => {
    set(state => ({
      pagination: { ...state.pagination, ...pagination }
    }));
    // Auto-refresh when pagination changes
    get().fetchRecords();
  },

  clearCurrentRecord: () => {
    set({ currentRecord: null });
  },
}));