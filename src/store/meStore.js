import { create } from 'zustand';
import axios from 'axios';
import useStore from './store'; 

const meStore = create((set, get) => ({
    apiurl: process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA,
    loading: false,
    error: null,
    getMe: async (formData) => {
        console.log('get me');
        set({ loading: true, error: null });
        try {
          const { token } = useStore.getState();
          
          const response = await axios.get(`${get().apiurl}/api/user` , {
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": 'application/json',
              }
          });
          
          set({ loading: false});
          return response.data;
  
        } catch(error) {
          console.error("Error create application:", error);
          set({ error: error.message, loading: false });
          return false;
  
        }
    }
}));

export default meStore;