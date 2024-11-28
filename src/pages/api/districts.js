import axios from "axios";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { province_code, amphoe_code } = req.body;
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API_9SINGHA}/api/addr/district`, { province_code, amphoe_code });
            res.status(200).json({ data: response.data});
        } catch (error) {
            res.status(error?.status || 500).json({message: error})
        }
    } else {
        res.status(405).end();
    }

}
  