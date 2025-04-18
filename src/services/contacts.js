import { DEFAULT_PAGINATION_VALUES } from '../constants/pagination.js';
import { ContactsCollection } from '../models/contact.js';
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
  page = DEFAULT_PAGINATION_VALUES.page, 
  perPage = DEFAULT_PAGINATION_VALUES.perPage,
  sortBy = DEFAULT_PAGINATION_VALUES.sortBy,
  sortOrder = DEFAULT_PAGINATION_VALUES.sortOrder,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactQuery = ContactsCollection.find();
  if (filter.maxAge) {
    contactQuery.where("age").lte(filter.maxAge);
  }
  if (filter.minAge) {
    contactQuery.where("age").gte(filter.minAge);
  }
  if (filter.maxAvgMark) {
    contactQuery.where("avgMark").lte(filter.maxAvgMark);
  }
  if (filter.minAvgMark) {
    contactQuery.where("avgMark").gte(filter.minAvgMark);
  }


  const totalCount = await ContactsCollection.countDocuments();

  const contacts = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  
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