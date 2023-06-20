import Express from 'express';

import { createProject, viewAllProjects } from '../../controllers/project/project';
const route = Express.Router();
route.post('/create', (req, res) => {
  createProject(req, res);
});
route.get('/viewall', viewAllProjects);

export default route;
