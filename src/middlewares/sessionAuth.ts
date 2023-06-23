import { Request, Response, NextFunction } from 'express';

export function sessionAuth(req: Request, res: Response, next: NextFunction): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = (req.session as any).passport;
  if (value) {
    next();
  } else {
    res.sendStatus(401);
  }
}
