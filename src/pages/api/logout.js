// pages/api/logout.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Clear cookies if using cookies for authentication
        res.setHeader('Set-Cookie', [
            'token=; Max-Age=0; Path=/; HttpOnly; Secure', // Clear token cookie
        ]);

        // Send a success response
        res.status(200).json({ message: 'Logged out successfully' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
