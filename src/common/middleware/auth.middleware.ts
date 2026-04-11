import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    // 1. Check the header exists
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    // 2. Check it follows the "Bearer <token>" format
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Authorization header must be: Bearer <token>');
    }

    const token = parts[1];

    // 3. Validate the token
    if (token !== 'dev-token-1') {
      throw new UnauthorizedException('Invalid token');
    }

    // 4. Token is valid — pass control to the next handler
    next();
  }
}