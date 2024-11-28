import { create } from 'zustand';
import axios from 'axios';
import useStore from './store'; 


const agentStore = create((set, get) => ({
    apiurl: process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA,
    loading: false,
    error: null,
    agent: null,
    sale: null,
    team: null,
    customer: null,
    createAgent: async (formData) => {
        console.log('create agent');
        set({ loading: true, error: null });
        try {
          const { token } = useStore.getState();
          const response = await axios.post(`${get().apiurl}/api/agent/register`, formData , {
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
    },
    updateDocument: async (formData) => {
        console.log('create agent');
        set({ loading: true, error: null });
        try {
          const { token } = useStore.getState();
          const response = await axios.post(`${get().apiurl}/api/agent/upload`, formData , {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });
          
          set({ loading: false});
          return response.data;
  
        } catch(error) {
          console.error("Error create application:", error);
          set({ error: error.message, loading: false });
          return false;
  
        }
    },
    myAgent: async (formData) => {
        
        set({ loading: true, error: null });
        try {
          const { token } = useStore.getState();
          const response = await axios.post(`${get().apiurl}/api/agent`, formData , {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });

          console.log(' my agent ', response);
          
          set({ loading: false, agent: response.data});
          return response.data;

        } catch(error) {
          console.error("Error create application:", error);
          set({ error: error.message, loading: false });
          return false;

        }
    },

    getSale: async (formData) => {
        
        set({ loading: true, error: null });
        try {
          const { token } = useStore.getState();
          const response = await axios.post(`${get().apiurl}/api/agent/sale`, formData , {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });

          console.log(' my agent ', response);
          
          set({ loading: false, sale: response.data});
          return response.data;

        } catch(error) {
          console.error("Error create application:", error);
          set({ error: error.message, loading: false });
          return false;

        }
    },
    getTeam: async (formData) => {
        
      set({ loading: true, error: null });
      try {
        const { token } = useStore.getState();
        const response = await axios.post(`${get().apiurl}/api/agent/team`, formData , {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        console.log(' my team ', response);
        
        set({ loading: false, team: response.data});
        return response.data;

      } catch(error) {
        console.error("Error create application:", error);
        set({ error: error.message, loading: false });
        return false;

      }
  },
  getMyCustomer: async (formData) => {
        
    set({ loading: true, error: null });
    try {
      const { token } = useStore.getState();
      const response = await axios.post(`${get().apiurl}/api/agent/application`, formData , {
          headers: {
              Authorization: `Bearer ${token}`,
          }
      });

      console.log(' my customer ', response);
      
      set({ loading: false, customer: response.data});
      return response.data;

    } catch(error) {
      console.error("Error create application:", error);
      set({ error: error.message, loading: false });
      return false;

    }
}
    
}));

export default agentStore;