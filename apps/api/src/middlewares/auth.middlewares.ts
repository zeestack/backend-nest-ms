import {
  HttpException,
  HttpStatus,
  Injectable,
  RequestMethod,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { JwtUtils } from '@app/utils';
import { NestMiddleware } from '@nestjs/common';
import { PathConfig } from '../configuration';

@Injectable()
export class AuthMiddlware implements NestMiddleware {
  constructor(private readonly jwtUtils: JwtUtils) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const path = req.originalUrl;
    const action = RequestMethod[req.method];

    if (PathConfig.isPublicPath(action, path)) return next();

    const token = this.getToken(req);

    if (!token)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const user = await this.jwtUtils.decode(token, 'secret');

    if (!user) throw new HttpException('Unathorized', HttpStatus.UNAUTHORIZED);

    req.user = user;

    return next();
  }

  private getToken(req: Request): string {
    return req.headers['authorization'];
  }
}
