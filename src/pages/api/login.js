import axios from "axios";
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { username, password} = req.body;
      try {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA}/oauth/token`, {
          username,
          password,
          grant_type: 'password',
          client_id: process.env.CLIENT_ID_9SINGHA,
          client_secret: process.env.CLIENT_SECRET_9SINGHA
        });
  
        res.status(200).json(response.data);
      } catch (error) {
        res.status(error?.status).json({message: error.response.data.message})
      }

    } else {
      res.status(405).end();
    }
  }
  