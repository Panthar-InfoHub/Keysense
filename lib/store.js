import { create } from "zustand";

const useAuthStore = create((set) => ({
    hotelId: null,
    hotelName: null,
    setHotelData: (hotelId, hotelName) => set({ hotelId, hotelName }),
    clearAuth: () => set({ hotelId: null, hotelName: null })
}));

export default useAuthStore;
