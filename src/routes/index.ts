import authentcationRoute from './passportAuthentication/routes';
import userRoute from './user/routes';
import Express from 'express';
import projectRoute from './project/routes';
const route = Express.Router();

route.use('/auth', authentcationRoute);
route.use('/user', userRoute);
route.use('/project', projectRoute);

export default route;
