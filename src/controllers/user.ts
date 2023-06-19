/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { deleteSession } from '../Utils/session';
import User from '../models/User';
import { FindOptions } from 'sequelize';

export async function viewProfile(req: Request, res: Response): Promise<any> {
  res.render('profile', { displayName: (req.user as any).displayName }); // Render 'profile.ejs' view with the display name
}
export async function logout(req: Request, res: Response): Promise<any> {
  req.session.destroy((error) => {
    if (error) {
      console.error('Error destroying session:', error);
    } else {
      const sessionId: string = req.sessionID;
      deleteSession(sessionId);
      res.render('logout'); // Render 'logout.ejs' view
    }
  });
}
function findOneUser(options: FindOptions): Promise<any | null> {
  return User.findOne(options);
}
export async function createUser(profile: any): Promise<void> {
  const userr = await findOneUser({ where: { gid: profile.id } });
  console.log(userr);
  if (!userr) {
    User.create({
      gid: profile.id,
      name: profile._json.name,
      email: profile._json.email,
    });
  } else {
    console.log('Already exists');
  }
}
