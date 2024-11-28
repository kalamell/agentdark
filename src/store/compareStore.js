import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCompareStore = create(
    persist(
        (set) => ({
            car: '',
            carid: '',
            selectedItems: [],
            setCar: async (car) => {
                console.log('set car : ', car);
                set({car: car})
            },
            setCarId: async (id) => {
                console.log('set car id : ', id);
                set({carid: id})
            },
            addItem: (item, masteritem) => set((state) => {
                if (
                state.selectedItems.length < 3 &&
                !state.selectedItems.find((i) => i._id.$oid === item._id.$oid)
                ) {
                const itemWithCode = { ...item, master: masteritem };
                return { selectedItems: [...state.selectedItems, itemWithCode] };
                }
                return state;
            }),
            removeItem: (item) => set((state) => ({
                selectedItems: state.selectedItems.filter((i) => i._id.$oid !== item._id.$oid),
            })),
            clearItems: () => set({ selectedItems: [] })
        }),
        {
            name: 'compare-9sigha-storage',
            partialize: (state) => ({ car: state.car, carid: state.carid, selectedItems: state.selectedItems }), // Only persist user and token
        }
    )
);

export default useCompareStore;
