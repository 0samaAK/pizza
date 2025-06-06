import Orders from "@/models/Orders";
import db from "@/utils/db";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await db.connect()
        try {
            let data = await Orders.find({ email: req.body.email })
            res.json({ orderData: data })
        } catch (error) {
            res.send('Server Error' + error.message)
        }
        await db.disconnect()
    }
}
