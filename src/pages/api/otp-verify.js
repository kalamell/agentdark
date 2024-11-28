import axios from "axios";
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { code, ref, token } = req.body;
      
      try {
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA}/api/user/verify`, {
          code, ref
        },
        {
            headers: {
                Authorization: `Bearer ${token}` // Use the token
            }
            
        });

        console.log(' ... otp : ', response);
  
        res.status(200).json({ data: response.data});
      } catch (error) {
        res.status(error?.status).json({message: error.response.data.message})
      }
      

    } else {
      res.status(405).end();
    }
    
  }
  