import { create } from 'zustand';
import axios from 'axios';
import useStore from './store'; 

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }


const getDefaultCovered = () => ({
    name: {
      title: "",
      first: "",
      last: "",
    },
    birthdate: "",
    mobile: "",
    email: "",
    id_nbr: "",
    address: {
      no: "",
      moo: "",
      village: "",
      project: "",
      floor: "",
      room: "",
      soi: "",
      road: "",
      province: "",
      district: "",
      subdistrict: "",
      zipcode: "",
      thaipost_id: ""
    },
    send_doc: "",
    send_vat: "",
    car: {
      no: [],
      province_code: "",
      engin: "ไม่ติดตั้งแก๊ส",
      body_no: ""
    },
    driver: { // ผู้ขับ
      title: "",
      first: "",
      last: "",
    },
    //protect_1year_start: "",  // ระยะเวลาคุ้มครอง 1  ปี
    //prb: "",                  // ซื้อ พรบ
    //prb_1year_start: "",      // ความคุ้มครอง
           // จัดส่ง +50
    //send_post_same: "",       // ที่อยู่เดียวกับหน้ากรมธรรม์
  });

  const getDefaultCoveredDriver = () => ({
    driver: { // ผู้ขับ
      title: "",
      first: "",
      last: "",
    }
  });

  const getDelAddress = () => ({
      no: "",
      moo: "",
      village: "",
      project: "",
      floor: "",
      room: "",
      soi: "",
      road: "",
      province: "",
      district: "",
      subdistrict: "",
      zipcode: "",
      thaipost_id: ""
  })

const applicationStore = create((set, get) => ({
    apiurl: process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA,
    loading: false,
    error: null,
    application: null,
    carid: null,
    packageid: null,
    fetchMyApplciation: async() => {
      set({ loading: true, error: null });
      try {
        const { token } = useStore.getState();
        const response = await axios.get(`${get().apiurl}/api/appplication`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            }
        });
        
        set({ oading: false});
        return response.data;

      } catch(error) {
        console.error("Error fetch my application:", error);
        set({ error: error.message, loading: false });
        return false;

      }

    },
    createApplication: async (car_id, package_id) => {
      console.log('create applicaiton');
      set({ loading: true, error: null });
      try {
        const { token } = useStore.getState();
        const response = await axios.post(`${get().apiurl}/api/appplication`, { car_id, package_id }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            }
        });
        
        set({ oading: false});
        return response.data;

      } catch(error) {
        console.error("Error create application:", error);
        set({ error: error.message, loading: false });
        return false;

      }

    },
    createSupport: async (app_id) => {
      console.log('create support ');
      set({ loading: true, error: null });
      try {
        const { token } = useStore.getState();
        const response = await axios.post(`${get().apiurl}/api/appplication/${app_id}/support`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            }
        });
        
        set({ oading: false});
        return response.data;

      } catch(error) {
        console.error("Error create application:", error);
        set({ error: error.message, loading: false });
        return false;

      }

    },
    uploadApplicationDocument: async (app_id, formData) => {
        console.log('create agent');
        set({ loading: true, error: null });
        try {
          const { token } = useStore.getState();
          const response = await axios.post(`${get().apiurl}/api/appplication/${app_id}/upload`, formData , {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });
          
          set({ loading: false});
          return response.data;

        } catch(error) {
          console.error("Error uploda document application:", error);
          set({ error: error.message, loading: false });
          return false;

        }
    },
    fetchApplication: async (app_id, $type = '') => {
        set({ loading: true, error: null });
        try {
            const { token } = useStore.getState();
            let url = `${get().apiurl}/api/appplication/${app_id}`;
            if ($type === 'quotation') {
              url = `${get().apiurl}/api/appplication/${app_id}/quotation`;
            }
            const response = await axios.get(`${url}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json',
                }
             });

             if (!response.data.covered) {
                response.data.covered = getDefaultCovered();
             }

             if (!response.data.covered.driver) {
              response.data.covered.driver = getDefaultCoveredDriver();
             }

             if (!response.data.is_del) {
              response.data.is_del  = false;
             }

             if (!response.data.covered.birthdate) {
              response.data.covered.birthdate = '';
             }

             if (!response.data.del_address) {
              response.data.del_address = getDelAddress();
             }

             delete response.data.covered.car.subdistrict;
             delete response.data.covered.car.district;
             delete response.data.covered.car.zipcode;
             delete response.data.covered.car.thaipost_id;

             delete response.data.covered.car.no1;
             delete response.data.covered.car.no2;
             delete response.data.covered.name.birthdate;

             delete response.data.covered.del_address;

             //const formattedDate = response.data.start.toISOString().split('T')[0];

             //console.log('>> ', response.data.start);

             if (response.data.start) {
              const startDate = new Date(response.data.start);

              if (!isNaN(startDate)) {  // Check if startDate is a valid Date object
                const formattedDate = startDate.toISOString().split('T')[0];
                response.data.start = formattedDate;
              } 
             }

             
            
            set({ application: response.data, carid: response.data.car_id, package_id: response.data.package_id, loading: false});

            return response.data;


        } catch (error) {
            console.error("Error fetching application:", error);
            set({ error: error.message, loading: false });
            return false;
        }
    },
    updateApplication: async (formData, app_id) => {
      console.log(' update application');
      set({loading: true, error: null});
      try {

        
        const { token } = useStore.getState();
        const response = await axios.post(`${get().apiurl}/api/appplication/${app_id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            }
        });
        
        set({ oading: false});

        return response.data;


      } catch(error) {

        set({ error: error.message, loading: false });
        return false;

      }
    },
    updateQuotation: async (app_id, discount) => {
      console.log(' quotation application');
      set({loading: true, error: null});
      try {

        
        const { token } = useStore.getState();
        const response = await axios.post(`${get().apiurl}/api/appplication/${app_id}/quotation`, { discount }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            }
        });
        
        set({ oading: false});

        return response.data;


      } catch(error) {

        set({ error: error.message, loading: false });
        return false;

      }

    },
    checkoutApplication: async (app_id) => {

      console.log(' checkout application');
      set({loading: true, error: null});
      try {

        
        const { token } = useStore.getState();
        const response = await axios.post(`${get().apiurl}/api/appplication/${app_id}/checkout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            }
        });
        
        set({ loading: false});

        return {
          success: true,
          data: response.data
        }


      } catch(error) {
        
        set({ error: error.message, loading: false });
        return false;

      }
      
    }
}));

export default applicationStore;