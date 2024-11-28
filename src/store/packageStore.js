// store/carStore.js
import { create } from 'zustand';
import axios from 'axios';
import useStore from './store'; 

const  usePackageStore = create((set, get) => ({
    apiurl: process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA,
    loading: false,
    error: null,
    packages: [],
    insurances: [],
    fetchInsurances: async () => {
      try {
        const { token } = useStore.getState();
        const response = await axios.post(`${get().apiurl}/api/package/insurers`, {}, {
            headers: {
                Authorization: `Bearer ${token}` // Use the token
            }
        });
        set({ insurances: response.data });
      } catch (error) {
        console.error("Error fetching insurances:", error);
      }
    },
    packages: [],
    fetchPackages: async (id, formData) => {

        const { token } = useStore.getState();
        const { insurances, packages, fetchInsurances } = usePackageStore.getState();

        await fetchInsurances();

        const existingInsurance = packages.find(item => item._id === id);
        if (existingInsurance) {
          console.log("Data already loaded, skipping fetch...");
          //return;  // Stop if data already exists
        }

        set({ loading: true, error: null });

        try {
          const { token } = useStore.getState();
          const response = await axios.post(`${get().apiurl}/api/package/search/${id}`, formData , {
              headers: {
                  Authorization: `Bearer ${token}` // Use the token
              }
          });

          
          if (response.data && response.data.length > 0) {

            const mergeAndInsertData = (responseData, insurances) => {
              responseData.forEach((firstItem) => {
                const matchingItem = insurances.find(
                  (secondItem) => secondItem._id === firstItem._id
                );
                if (matchingItem) {
                  console.log('matching : ', matchingItem);
                  Object.assign(matchingItem, { ...matchingItem, ...firstItem});
                }
              });

              return insurances;
            };

            let mergedData = mergeAndInsertData(response.data, insurances);
            mergedData = mergedData.filter((firstItem) => firstItem.count);
            set({ packages: mergedData, loading: false });

          } else {

            set({ packages: response.data, loading: false });

          }

          return true;

          
        } catch (error) {
          console.error("Error fetching car brands:", error);
          set({ packages: [], error: error.message, loading: false });
          return false;
        }
      },
    

}));

export default usePackageStore;