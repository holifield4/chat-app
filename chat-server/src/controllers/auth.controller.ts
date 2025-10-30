import { NextFunction, Request, Response } from 'express';
import { SocketData } from '../types/type';
import { io } from '../app';

/**
 * Simple authroization implementation
 */

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body as SocketData;

    if (!username) {
      res.status(401).json({ error: 'Please provide username' });
    }

    res.status(200).json({ message: 'Successfully login' });
  } catch (error) {
    next(error);
  }
};
