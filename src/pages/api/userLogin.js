import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from "@/models/Users";
import db from "@/utils/db";

const jwtSecret = 'oak'

export default async function handler(req, res) {
    let success = false

    if (req.method === 'POST') {
        await db.connect()
        const { email, password } = req.body
        try {
            let user = await Users.findOne({ email })
            if (!user) {
                res.status(400).json({ success, error: 'Email Me Bhand Hai' })
            }
            const comparePass = await bcrypt.compare(password, user.password)
            if (!comparePass) {
                res.status(400).json({ success, error: 'Password Me Bhand Hai' })
            }
            const data = { 
                user: { 
                    id:user['_id'] 
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            const isAdmin = await user.isAdmin
            success = true
            res.json({ 
                success: success, 
                authToken: authToken,
                isAdmin
            })
        } catch (error) {
            console.log(error.message);
           res.send('Server Error') 
        }
    }
}
