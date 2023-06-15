/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, Router } from 'express';
import { deleteSession } from '../Sessions/Create';
import User from '../Models/User';
import { FindOptions } from 'sequelize';

export const router: Router = Router();
function isLoggedIn(req: Request, res: Response, next: NextFunction): void {
  const value = (req.session as any).passport;
  if (value) {
    next();
  } else {
    res.sendStatus(401);
  }
}

router.get('/profile', isLoggedIn, async (req: Request, res: Response) => {
  res.render('profile', { displayName: (req.user as any).displayName }); // Render 'profile.ejs' view with the display name

});
router.get('/logout', (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Error destroying session:', error);
    } else {
      const sessionId: string = req.sessionID;
      deleteSession(sessionId);
      res.render('logout'); // Render 'logout.ejs' view
    }
  });
});
function findOneUser(options: FindOptions): Promise<any | null> {
  return User.findOne(options);
}
export async function  createUser(profile: any): Promise<void> {
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

export default { router, createUser };
