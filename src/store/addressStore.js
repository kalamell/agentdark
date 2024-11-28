// store/carStore.js
import { create } from 'zustand';
import axios from 'axios';

import useCarStore from './carStore'; 

const useAddressStore = create((set, get) => ({
  apiurl: process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA,
  provinces: [], 
  amphoes: [],
  districts: [],

  provinces2: [], 
  amphoes2: [],
  districts2: [],


  loading: false,
  error: null,

  province: '',
  amphoe: '',
  district: '',
  zipcode: '',
  address_id: '',


  province2: '',
  amphoe2: '',
  district2: '',
  zipcode2: '',
  address_id2: '',

  setProvince: async (province) => {
    set({ province: province});
  },

  setAmphoe: async (amphoe) => {
    set({ amphoe: amphoe});
  },

  setDistrict: async (district) => {
    set({ district: district});
  },

  setZipcode: async (zipcode) => {
    set({ zipcode: zipcode});
  },

  setProvince2: async (province) => {
    set({ province2: province});
  },

  setAmphoe2: async (amphoe) => {
    set({ amphoe2: amphoe});
  },

  setDistrict2: async (district) => {
    set({ district2: district});
  },

  setZipcode2: async (zipcode) => {
    set({ zipcode2: zipcode});
  },
  
  
  fetchProvices: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${get().apiurl}/api/addr/province`);
      //console.log(response.data);
      const transformedData = Object.entries(response.data).map(([value, label]) => ({
        value, 
        label
      }));
      set({ provinces: transformedData, loading: false });
      set({ address_id: '', zipcode: '', loading: false });
      
      
      
    } catch (error) {
      console.error("Error fetching provinces:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchAmphoes: async (province_code) => {
    set({ loading: true, error: null });
    try {
      //api/addr/amphoe
      //const response = await axios.post('/api/amphoes', { province_code });
      const response = await axios.post(`${get().apiurl}/api/addr/amphoe`, { province_code });
      const transformedData = Object.entries(response.data).map(([value, label]) => ({
        value, 
        label
      }));
      set({ amphoes: transformedData, loading: false });
      set({ address_id: '', zipcode: '', loading: false });
      
    } catch (error) {
      console.error("Error fetching amphoes:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchDistricts: async () => {
    set({ loading: true, error: null });
    const { province, amphoe } = useAddressStore.getState();
    console.log('province : ', province, ' amphoe : ', amphoe);
    try {
      const response = await axios.post(`${get().apiurl}/api/addr/district`, { province_code: province, amphoe_code: amphoe });
      const transformedData = Object.entries(response.data).map(([value, label]) => ({
        value, 
        label
      }));
      set({ districts: transformedData, loading: false });
      set({ address_id: '', zipcode: '', loading: false });
      
    } catch (error) {
      console.error("Error fetching districts:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchZipcode: async () => {
    set({ loading: true, error: null });
    const { district } = useAddressStore.getState();
    try {
      const response = await axios.post(`${get().apiurl}/api/addr/zipcode`, { district_code: district });
      set({ address_id: response.data._id, zipcode: response.data.zipcode, loading: false });
      return {
        address_id: response.data._id, 
        zipcode: response.data.zipcode
      }
      
    } catch (error) {
      console.error("Error fetching districts:", error);
      set({ error: error.message, loading: false });
    }
  },


  fetchProvices2: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${get().apiurl}/api/addr/province`);
      //console.log(response.data);
      const transformedData = Object.entries(response.data).map(([value, label]) => ({
        value, 
        label
      }));
      set({ provinces2: transformedData, loading: false });
      set({ address_id2: '', zipcode2: '', loading: false });
      
      
      
    } catch (error) {
      console.error("Error fetching provinces 2:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchAmphoes2: async (province_code) => {
    set({ loading: true, error: null });
    try {
      //api/addr/amphoe
      //const response = await axios.post('/api/amphoes', { province_code });
      const response = await axios.post(`${get().apiurl}/api/addr/amphoe`, { province_code });
      const transformedData = Object.entries(response.data).map(([value, label]) => ({
        value, 
        label
      }));
      set({ amphoes2: transformedData, loading: false });
      set({ address_id2: '', zipcode2: '', loading: false });
      
    } catch (error) {
      console.error("Error fetching amphoes 2:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchDistricts2: async () => {
    set({ loading: true, error: null });
    const { province2, amphoe2 } = useAddressStore.getState();
    try {
      const response = await axios.post(`${get().apiurl}/api/addr/district`, { province_code: province2, amphoe_code: amphoe2 });
      const transformedData = Object.entries(response.data).map(([value, label]) => ({
        value, 
        label
      }));
      set({ districts2: transformedData, loading: false });
      set({ address_id2: '', zipcode2: '', loading: false });
      
    } catch (error) {
      console.error("Error fetching districts 2:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchZipcode2: async () => {
    set({ loading: true, error: null });
    const { district2 } = useAddressStore.getState();
    try {
      const response = await axios.post(`${get().apiurl}/api/addr/zipcode`, { district_code: district2 });
      set({ address_id2: response.data._id, zipcode2: response.data.zipcode, loading: false });
      return {
        address_id: response.data._id, 
        zipcode: response.data.zipcode
      }
      
    } catch (error) {
      console.error("Error fetching zipcode 2:", error);
      set({ error: error.message, loading: false });
    }
  },


  
}));

export default useAddressStore;
