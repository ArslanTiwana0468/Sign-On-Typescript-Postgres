/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import db from '../../database/models';

export async function createProject(req: Request, res: Response): Promise<any> {
  console.log('ssnkdajns' + req.body);
  const project = await db.Project.create({
    title: req.body.title,
    status: req.body.status,
  });
  res.send({ project });
}
export async function viewAllProjects(req: Request, res: Response): Promise<any> {
  const projects = await db.Project.findAll();
  res.send(projects);
}
