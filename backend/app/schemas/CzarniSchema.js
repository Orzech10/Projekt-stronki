import mongoose from "mongoose";

const Czarnuch = new mongoose.Schema({
    photo: {type: String},
    price: {type: String},
    name: {type: String},
    description: {type: String}
})

export default mongoose.model('Czarni', Czarnuch);