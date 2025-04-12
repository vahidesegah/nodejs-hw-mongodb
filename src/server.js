import express from "express";
import pinoHttp from "pino-http";
import cors from "cors";
import dotenv from "dotenv";
import { getContacts } from "../src/services/contacts.js";
import { getContactsById } from "../src/services/contacts.js";



export function setupServer() {

    dotenv.config();
    
    const mongoUri = process.env.MONGO_URI;

    
const PORT = process.env.PORT; //.env deki port u al
    const app = express();
    
    console.log("MongoUri:", mongoUri);

app.use(cors());

app.use(express.json());

app.use(
    pinoHttp({
        transport: {
            target: "pino-pretty",
        },
    }),
);

    app.get("/contacts", async (req, res) => {
        const contacts = await getContacts();

        res.status(200).send({
            message: "Successfully found contacts!",
            status: 200,
            data: contacts,
        });
    });

    app.get("/contacts/:contactId", async (req, res) => {
        const { contactId } = req.params;
         const contacts = await getContactsById(contactId);

        if (!contacts) {
            return res.status(404).send({
                message: "Contact not found!",
                status: 404
            });
        }
        
        res.status(200).send({
            message: "Successfully found contacts!",
            status: 200,
            data: contacts,
        });

        res.status(500).send({
            status: 500,
            message: "Something went wrong",
            data: error.message,
        })

    });

    
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};


