import axios from "axios";
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { id, token } = req.body;
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA}/api/package/search/${id}`, {}, {
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
    
  }
  