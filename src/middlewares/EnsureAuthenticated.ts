import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const decode = verify(token, "f2032ad5c2ddf46ce11bc287267f721f") as IPayload;

    const { sub } = decode;

    request.user_id = sub;

  } catch (err) {
    return response.status(401).end();
  }

  return next();
}