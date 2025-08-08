import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  // Navigation State
  currentView: 'dashboard',
  setCurrentView: (view) => set({ currentView: view }),
  
  // Filter State
  filters: {
    selectedRegion: 'All',
    selectedTechnology: 'All',
    selectedExperience: 'All',
    selectedBudget: 'All'
  },
  setFilter: (filterType, value) => set((state) => ({
    filters: { ...state.filters, [filterType]: value }
  })),
  resetFilters: () => set({
    filters: {
      selectedRegion: 'All',
      selectedTechnology: 'All',
      selectedExperience: 'All',
      selectedBudget: 'All'
    }
  }),
  
  // Candidate State
  selectedCandidate: null,
  setSelectedCandidate: (candidate) => set({ selectedCandidate: candidate }),
  
  // AI Matching State
  isMatching: false,
  matchingStage: 0,
  matches: [],
  setMatching: (isMatching) => set({ isMatching }),
  setMatchingStage: (stage) => set({ matchingStage: stage }),
  setMatches: (matches) => set({ matches }),
  
  // Tour State
  isTourActive: false,
  tourStep: 0,
  setTourActive: (active) => set({ isTourActive: active }),
  setTourStep: (step) => set({ tourStep: step }),
  
  // Analytics State
  analyticsTimeRange: '6months',
  setAnalyticsTimeRange: (range) => set({ analyticsTimeRange: range }),
  
  // Search State
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Notification State
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, id: Date.now() }]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  // Loading States
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Modal State
  activeModal: null,
  setActiveModal: (modal) => set({ activeModal: modal })
}));
