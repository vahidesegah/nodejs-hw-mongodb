import Contacts from "../db/models/contacts.js";

const getContacts = async () => {
    const contacts = await Contacts.find();
    return contacts;
};


const getContactsById = async (id) => {
    const contacts = await Contacts.findById(id);
    return contacts;
};



export { getContacts, getContactsById };