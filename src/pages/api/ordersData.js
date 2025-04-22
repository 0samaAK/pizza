import Orders from "@/models/Orders";
import db from "@/utils/db";

export default async function handler(req, res) {
    
    if (req.method === 'POST') {
        await db.connect()
        let data = req.body.orderData
        await data.splice(0,0,{ orderDate: Date.now() })
        let eId = await Orders.findOne({ email: req.body.email })
        if (eId === null){
            try {
                await Orders.create({ email: req.body.email, orderData: [data] }).then(()=>{ res.json({ success: true })
            })
            } catch (error) {
                res.send('Server Error', error.message)
            }
        } else{
            try {
                await Orders.findOneAndUpdate({ email: req.body.email},{$push: { orderData: data }}).then(()=>{ res.json({ success: true }) })
            } catch (error) {
                res.send('Server Error', error.message)
            }
        }
        await db.disconnect()
    }
}
