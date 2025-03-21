import express from "express";
import pinoHttp from "pino-http";
import cors from "cors";
import dotenv from "dotenv";
import { getContacts } from "../db/services/contacts.js";
import { getContactsById } from "../db/services/contacts.js";

export function setupServer() {

dotenv.config();
const PORT = process.env.PORT; //.env deki port u al
const app = express();

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

        if (!contact) {
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

    });




    
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};


