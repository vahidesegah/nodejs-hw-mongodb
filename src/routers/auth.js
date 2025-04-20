import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validators/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema} from '../validators/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';


const UserRouter = Router();

UserRouter.post('/register',  validateBody(registerUserSchema),  ctrlWrapper(registerUserController));

UserRouter.post('/login',  validateBody(loginUserSchema),  ctrlWrapper(loginUserController));

UserRouter.post('/logout', ctrlWrapper(logoutUserController));

UserRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));


export default router;