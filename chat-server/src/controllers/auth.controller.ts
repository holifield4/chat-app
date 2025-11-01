import { NextFunction, Request, Response } from 'express';
import { SocketData } from '../types/type';
import jwt from 'jsonwebtoken';
import config from '../config/config';

/**
 * Simple authentication implementation
 */

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body as SocketData;

    if (!username || username.trim() === '') {
      res.status(401).json({ error: 'Please provide username' });
    }

    const token = jwt.sign({ username }, config.jwtSecret, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Successfully login', token });
  } catch (error) {
    next(error);
  }
};
