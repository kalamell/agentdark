import axios from "axios";
export default async function handler(req, res) {

    const { action } = req.body;
    switch(action) {
        case 'create': 
            if (req.method === 'POST') {
                try {
                    const { car_id, package_id, token } = req.body;
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA}/api/appplication`, { 
                        car_id, package_id
                     }, {
                        headers: {
                            Authorization: `Bearer ${token}` // Use the token
                        }
                     });
                    res.status(200).json({ data: response.data});
                } catch (error) {
                    res.status(error?.status || 500).json({message: error})
                }
            } else {
                res.status(405).end();
            }
        break;

        case 'update': 
            if (req.method === 'POST') {
                try {
                    const { app_id, formData, token } = req.body;
                    const response = await axios.post(`${process.env.ENDPOINT_API_9SINGHA}/api/appplication/${app_id}`, formData , {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": 'application/json',
                        }
                     });
                    res.status(200).json({ data: response.data});
                } catch (error) {
                    res.status(error?.status || 500).json({message: error})
                }
            } else {
                res.status(405).end();
            }
        break;

        case 'checkout': 
            if (req.method === 'POST') {
                try {
                    const { app_id, token } = req.body;
                    const response = await axios.post(`${process.env.ENDPOINT_API_9SINGHA}/api/appplication/${app_id}/checkout`, {} , {
                        headers: {
                            Authorization: `Bearer ${token}` // Use the token
                        }
                     });
                     console.log(response.data);
                    res.status(200).json({ data: response.data});
                } catch (error) {
                    res.status(error?.status || 500).json({message: error})
                }
            } else {
                res.status(405).end();
            }
        break;
    }

}
  