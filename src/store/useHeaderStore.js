// src/store/useHeaderStore.js
import { create } from 'zustand';

const useHeaderStore = create((set) => ({
    headerShow: true,
    setHeaderShow: (value) => set({ headerShow: value }),
}));

export default useHeaderStore;
