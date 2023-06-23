import Express from 'express';

import { createProjectAssignment } from '../../controllers/projectAssignment/projectAssignment';
const route = Express.Router();
route.post('/create', createProjectAssignment);
export default route;
