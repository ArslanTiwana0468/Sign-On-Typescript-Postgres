import { Request, Response, NextFunction, Router } from 'express';
// import deleteSession from '../database/deleteSessionDb';

const router: Router = Router();
function isLoggedIn(req: Request, res: Response, next: NextFunction): void {
    console.log(JSON.stringify(req.session))

    req.session? next() : res.sendStatus(401);
}

router.get('/profile', isLoggedIn, async (req: Request, res: Response) => {
    res.send(`Hello ${req.user}) 
    '<a href="/user/logout">Logout</a>'`);
});

router.get('/logout', (req: Request, res: Response) => {
  req.session?.destroy((error) => {
    if (error) {
      console.error('Error destroying session:', error);
    } else {
      // const sessionId = req.sessionID;
      // deleteSession(sessionId);
      res.send('Goodbye!');
    }
  });
});

export default router;

  