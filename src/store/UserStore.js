import {create} from 'zustand';

const useUserStore = create((set) => ({
    user: {},
    setUser: (user) => set({ user }),
    logout: () => set({ user: {} }),
}));

export default useUserStore;