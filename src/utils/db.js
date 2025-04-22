import mongoose from "mongoose";

const mongoURL = "mongodb+srv://pizza:pizza@pizza.ao4k6bj.mongodb.net/pizza?retryWrites=true&w=majority&appName=Pizza"

const connection = {}

async function connect(){
    if (connection.isConnected) {
        console.log('Already Connected');
        return
    }
    
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState
        if (connection.isConnected === 1) {
            console.log('use previous connection');
            return
        }

        await mongoose.disconnect()
    }

    const db = await mongoose.connect(mongoURL,{
        connectTimeoutMS: 3000,
        socketTimeoutMS: 3000
    })

    console.log('New Connection');
}

async function disconnect(){
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect()
            connection.isConnected = false
        } else {
            console.log('Not Disconnected');
        }
    }
}

const db = { connect, disconnect }

export default db