import axios from "axios";
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, mobile, email, password, password_confirmation } = req.body;
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA}/api/register`, {
          name,
          mobile,
          email,
          password,
          password_confirmation
        });
  
        res.status(200).json(response.data);
      } catch (error) {
        console.log('register error');
        res.status(error?.status).json({message: error.data});
      }

    } else {
      
      res.status(405).end();
    }
  }
  