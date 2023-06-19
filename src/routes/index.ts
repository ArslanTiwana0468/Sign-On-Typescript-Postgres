import authentcationRoute from './passportAuthentication/routes';
import userRoute from './user/routes';
import Express from 'express';

const route = Express.Router();
route.use('/auth', authentcationRoute);
route.use('/user', userRoute);
export default route;
