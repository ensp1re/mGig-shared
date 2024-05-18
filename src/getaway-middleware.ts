import {Request, Response, NextFunction} from "express"
import JWT from 'jsonwebtoken'
import {NotAuthorizedError} from "./error-handler";

const tokens: string[] = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];

export function verifyGetawayRequest(req: Request, res: Response, next: NextFunction): void {
  if (!req.headers?.getawayToken) {
    throw new NotAuthorizedError('Invalid request', 'verifyGetawayRequest() method: Request not coming from api getaway')
  }
  const token: string = req.headers?.getawayToken as string;
  if (!token) {
    throw new NotAuthorizedError('Invalid request', 'verifyGetawayRequest() method: Request not coming from api getaway')
  }

  try {
    const payload: { id: string, iat: number } = JWT.verify(token, '') as { id: string, iat: number }

    if (!token.includes(payload.id)) {
      throw new NotAuthorizedError('Invalid request', 'verifyGetawayRequest() method: Request payload is invalid')
    }
  } catch (error) {
    throw new NotAuthorizedError('Invalid request', 'verifyGetawayRequest() method: Request not coming from api getaway')
  }
}
