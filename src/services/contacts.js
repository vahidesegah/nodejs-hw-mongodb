import Contacts from "../db/models/contacts";

const getContacts = async () => {
    const contacts = await Contacts.find();
    return contacts;
};


const getContactsById = async () => {
    const contacts = await Contacts.findById(id);
    return contacts;
};

export { getContacts, getContactsById };