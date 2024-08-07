import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);

        const connrction = mongoose.connection;

        connrction.on('connected', () => {
            console.log('MongoDB connected Successfully');
            
        })

        connrction.on('error', (err) => {
            console.log('Error connecting MongoDB' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Error Connecting Database' + error)
    }
}