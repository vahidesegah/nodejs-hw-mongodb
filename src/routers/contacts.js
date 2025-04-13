import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from "../middlewares/validatorBody.js";
import { createContactSchema } from '../validators/contacts.js';
import { updateContactSchema } from "../validators/contacts.js";

import { Router } from 'express';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));

contactsRouter.patch('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));

contactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;