import express, { json } from "express";
import db from "./db.js";
import cors from "cors";
import CzarniSchema from "./schemas/CzarniSchema.js";


const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send({message: "Chuj ci w dupe"})
})

app.get('/czarnuch', async(req, res) => {
    try {
        await db();
        const data = await CzarniSchema.find();

        if(!data) res.status(404).send({message: "Czarni not found"});

        res.send({data});

    } catch (err) {
        console.log(err);
    }
})

app.post('/czarnuch', async(req, res) => {
    try {
        await db();
        const data = await CzarniSchema.insertMany([
            {
                photo: "./img/nazwa.jpg",
                price: "",
                name: "",
                description: ""
            },
            {
                photo: "",
                price: "",
                name: "",
                description: ""
            },
            {
                photo: "",
                price: "",
                name: "",
                description: ""
            },
            {
                photo: "",
                price: "",
                name: "",
                description: ""
            }
        ]);

        if(!data) res.status(404).send({message: "Czarni not found"});

        res.send({data});

    } catch (err) {
        console.log(err);
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}`)
    db();
})

// patryk2008