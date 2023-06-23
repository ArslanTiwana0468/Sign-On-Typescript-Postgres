import { Request, Response } from 'express';
import projectAssignment from '../../database/models/projectassignment';

export async function createProjectAssignment(req: Request, res: Response) {
  const projects = await projectAssignment.create({
    ProjectId: req.body.ProjectId,
    UserId: req.body.UserId,
  });
  res.send({ projects });
}
export async function viewAllProjectAssignments() {
  const projects = await projectAssignment.findAll();
  console.log(projects);
}
