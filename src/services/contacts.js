import { ContactsCollection } from '../models/contact.js';
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async (page, perPage) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contacts = ContactsCollection.find().skip(skip).limit(limit);
  const totalCount = await ContactsCollection.countDocuments();
  const pagination = calculatePaginationData(totalCount, page, perPage);

  return {
    data: contacts,
    pagination,
    };
  };


export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload = {}) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
    },
  );

  if (!updatedContact) return null;

  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};