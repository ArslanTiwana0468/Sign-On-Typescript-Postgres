/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../database/models';

export async function createProjectAssignment(UserId: any, ProjectId: any) {
  const projects = await db.projectAssignment.create({
    ProjectId: ProjectId,
    UserId: UserId,
  });
  console.log(projects);
}
export async function viewAllProjectAssignments() {
  const projects = await db.projectAssignment.findAll();
  console.log(projects);
}
