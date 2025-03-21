import { Schema, model } from "mongoose";



const contactsSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: ["Work", "Home", "Personal"],
        required: true,
        default: "Personal"
    },
    timeStamps: true
});

const Contacts = model("Contacts", contactsSchema);

export default Contacts;

