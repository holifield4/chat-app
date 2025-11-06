import { NextFunction, Request, Response } from 'express';
import { SocketData } from '../types/type';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { checkUsername } from '../middleware/auth.middleware';

/**
 * Simple authentication implementation
 */

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username } = req.body as SocketData;

    if (!username || username.trim() === '') {
      return res.status(401).json({ error: 'Please provide username' });
    }
    const isTaken = await checkUsername(username.trim());

    if (isTaken) {
      return res.status(409).json({ error: 'Username is already taken' });
    }
    const token = jwt.sign({ username: username.trim() }, config.jwtSecret, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Successfully login', token });
  } catch (error) {
    next(error);
  }
};
