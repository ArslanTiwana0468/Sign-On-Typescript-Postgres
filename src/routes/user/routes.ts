import Express from 'express';
import { logout, viewProfile } from '../../controllers/user';
import { sessionAuth } from '../../middlewares/sessionAuth';
const route = Express.Router();
route.get('/profile', sessionAuth, viewProfile);
route.get('/logout', logout);

export default route;
