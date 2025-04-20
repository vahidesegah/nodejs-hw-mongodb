import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validators/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema} from '../validators/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';


const userAuthRouter = Router();

// /auth/register anlamına geliyor
userAuthRouter.post('/register',  validateBody(registerUserSchema),  ctrlWrapper(registerUserController));

// /auth/login
userAuthRouter.post('/login',  validateBody(loginUserSchema),  ctrlWrapper(loginUserController));

// /auth/refresh
userAuthRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

// /auth/logout
userAuthRouter.post('/logout', ctrlWrapper(logoutUserController));


export default userAuthRouter;