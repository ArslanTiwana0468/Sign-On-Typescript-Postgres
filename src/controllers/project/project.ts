import { Request, Response } from 'express';
import Project from '../../database/models/project';
export async function createProject(req: Request, res: Response): Promise<void> {
  console.log('ssnkdajns' + req.body);
  const project = await Project.create({
    title: req.body.title,
    status: req.body.status,
    description: 'sss',
  });
  res.send({ project });
}
export async function viewAllProjects(req: Request, res: Response): Promise<void> {
  const projects = await Project.findAll();
  res.send(projects);
}
