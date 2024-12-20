import { create } from 'zustand';

export const useStore = create((set) => ({
  // User state
  loggedInUser: null,
  setLoggedInUser: (user) => set({ loggedInUser: user }),
  logoutUser: () => set({ loggedInUser: null }),

  // Project state
  projects: [],
  loadingProjects: true,
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  setLoadingProjects: (loading) => set({ loadingProjects: loading }),

  // Task state
  tasks: [],
  loadingTasks: true,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  setLoadingTasks: (loading) => set({ loadingTasks: loading }),

  // Team state
  teams: [],
  loadingTeams: true,
  setTeams: (teams) => set({ teams }),
  addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
  setLoadingTeams: (loading) => set({ loadingTeams: loading }),

  // Dashboard state
  dashboardData: {
    teamsCount: 0,
    projects: 0,
    pendingTasks: 0,
    completedTasks: 0,
  },
  setDashboardData: (data) => set({ dashboardData: data }),

  // Chart data state
  chartData: {
    labels: [],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [],
        borderColor: '#4ADE80',
        backgroundColor: 'rgba(74, 222, 128, 0.2)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#4ADE80',
      },
    ],
  },
  setChartData: (data) => set({ chartData: data }),

  // User state
  users: [],
  loadingUsers: true,
  setUsers: (users) => set({ users }),
  setLoadingUsers: (loading) => set({ loadingUsers: loading }),
}));
