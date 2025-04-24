import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { createContactSchema } from '../validators/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";




export const getAllContactsController = async (req, res) => {
  const queryParams = req.query;
  const { page, perPage } = parsePaginationParams(queryParams);
  const { sortBy, sortOrder } = parseSortParams(queryParams);
  const filter = parseFilterParams(queryParams);

  const contacts = await getAllContacts({
    page, 
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).send({
    message: 'Successfully found contacts!',
    status: 200,
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  const photo = req.file;
  let photoUrl = null;

  if (photo) {
    const { filename } = photo;
    const fileUrl = `${process.env.APP_DOMAIN}/uploads/${filename}`;
    photoUrl = fileUrl;
  }
  
  //ekleyeceğiz
  
  try {
    await createContactSchema.validateAsync(contact, {
      abortEarly: false,
    });
  } catch (error) {
    throw createHttpError(
      400,
      error.details.map((err) => err.message).join(`, `),
    );
  }  
  
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};