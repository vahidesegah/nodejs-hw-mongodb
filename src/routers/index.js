import { Router } from 'express';
import contactsRouter from './contacts.js';
import userAuthRouter from './auth.js';

const router = Router();

router.use('/', contactsRouter);
router.use('/auth', userAuthRouter);

export default router;