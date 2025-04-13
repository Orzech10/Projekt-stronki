import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://patryksliz11:patryk2008@cluster0.gjqxcta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const db = async () => {
    try {
        await mongoose.connect(MONGO_URI).then(res => console.log('DB connected')).catch(err => console.log(err));
    } catch (err) {
        console.error(`Db error ${err}`)
    }
}

export default db;