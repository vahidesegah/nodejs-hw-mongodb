import express from 'express';
import contactsRouter from './contacts.js';
import userAuthRouter from './auth.js';

const router = express.Router();

router.use('/contacts', contactsRouter);
router.use('/auth', userAuthRouter);

export default router;