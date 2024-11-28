import axios from "axios";
import qs from 'qs';
export default async function handler(req, res) {

    const { action } = req.body;
    switch(action) {
        case 'register': 
            if (req.method === 'POST') {
                try {
                    const { token, data} = req.body;
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA}/api/agent/register`, data , {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": 'application/json',
                        }
                     });
                    res.status(200).json({ data: response.data});
                } catch (error) {
                    console.error("Error response:", error.response?.data || error.message);

                    // Return a more detailed error message
                    res.status(error?.response?.status || 500).json({
                        message: error.response?.data?.message || "Internal server error",
                        details: error.response?.data || null,
                    });
                }
            } else {
                res.status(405).end();
            }
        break;
    }

}
  