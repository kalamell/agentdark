import axios from "axios";
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { mobile } = req.body;
      try {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA}/api/guest`, {
          mobile
        });
  
        res.status(200).json(response.data);
      } catch (error) {
        res.status(error?.status).json({message: error.response.data.message})
      }

    } else {
      res.status(405).end();
    }
  }
  