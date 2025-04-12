import { getContactsById } from "../services/contacts.js";
import express from "express";
import { getContacts } from "../src/services/contacts.js";
import dotenv from "dotenv";


    dotenv.config();
    
    const mongoUri = process.env.MONGO_URI;
    
    const app = express();
    
    console.log("MongoUri:", mongoUri);



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
        });


    
    });

