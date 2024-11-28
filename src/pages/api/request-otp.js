import axios from "axios";
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { token } = req.body;
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA}/api/user/otp`, {}, {
            headers: {
                Authorization: `Bearer ${token}` // Use the token
            }
        });
  
        res.status(200).json(response.data);
      } catch (error) {
        res.status(error?.status).json({message: error.response.data.message})
      }

    } else {
      res.status(405).end();
    }
  }
  