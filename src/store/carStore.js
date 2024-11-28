// store/carStore.js
import { create } from 'zustand';
import axios from 'axios';
import useStore from './store'; 


const useCarStore = create((set, get) => ({
  apiurl: process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA,
  carBrands: [], 
  carModels: [],
  carYears: [],
  carSubModels: [],
  loading: false,
  error: null,
  brand: '',
  model: '',
  year: '',
  submodel: '',
  car: '',

  
  setBrand: async (brand) => {
    set({ brand: brand });
  },

  setModel: async (model) => {
    set({ model: model});
  },

  setYear: async (year) => {
    set({ year: year});
  },

  setSubModel: async (submodel) => {
    set({ submodel: submodel});
  },
  
  fetchCarBrands: async () => {
    set({ loading: true, error: null });
    try {

      const response = await axios.post(`${get().apiurl}/api/car/brands`);

      const transformedData = Object.entries(response.data.data).map(
        ([value, label]) => ({
          value,
          label,
        })
      );
      

      set({ carBrands: transformedData, loading: false });
      
    } catch (error) {
      console.error("Error fetching car brands:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchCarModels: async (brand) => {
    set({ loading: true, error: null });
    try {

      
      const response = await axios.post(`${get().apiurl}/api/car/models`, { brand });
      const transformedData = Object.entries(response.data.data).map(
        ([value, label]) => ({
          value,
          label,
        })
      );
      set({ carModels: transformedData, loading: false });

    } catch (error) {
      console.error("Error fetching car models:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchCarYears: async () => {
    set({ loading: true, error: null });
    const { model, brand } = useCarStore.getState();
    try {
      
      const response = await axios.post(`${get().apiurl}/api/car/years`, { model, brand });
      const transformedData = Object.entries(response.data.data).map(
        ([value, label]) => ({
          value,
          label,
        })
      );

      set({ carYears: transformedData, loading: false });

    } catch (error) {
      console.error("Error fetching car car years:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchCarSubModel: async () => {
    set({ loading: true, error: null });
    const { model, brand, year } = useCarStore.getState();
    try {
      const response = await axios.post(`${get().apiurl}/api/car/submodels`, { model, brand, year });
            
      const transformedData = Object.entries(response.data.data).map(([value, label]) => ({
        value, 
        label
      }));
      set({ carSubModels: transformedData, loading: false });

    } catch (error) {
      console.error("Error fetching car car years:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchCarId: async (id) => {
    set({ loading: true, error: null });
  
    try {

      const response = await axios.post(`${get().apiurl}/api/car/${id}`, {});
      set({ car: response.data.data, loading: false });

    } catch (error) {
      console.error("Error fetching car car years:", error);
      set({ error: error.message, loading: false });
    }
  }
}));

export default useCarStore;
