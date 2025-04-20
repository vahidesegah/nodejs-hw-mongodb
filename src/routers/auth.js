import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validators/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema} from '../validators/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';


const UserAuthRouter = Router();

// /auth/register anlamına geliyor
UserAuthRouter.post('/register',  validateBody(registerUserSchema),  ctrlWrapper(registerUserController));

UserAuthRouter.post('/login',  validateBody(loginUserSchema),  ctrlWrapper(loginUserController));

UserAuthRouter.post('/logout', ctrlWrapper(logoutUserController));

UserAuthRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));


export default UserAuthRouter;