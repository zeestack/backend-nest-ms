import { Injectable } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common';

const PublicPaths = [
  {
    method: RequestMethod.POST,
    path: '/auth/login',
  },
  {
    method: RequestMethod.GET,
    path: '/products/all',
  },
  {
    method: RequestMethod.GET,
    path: '/products/:productId',
  },
];

@Injectable()
export class PathConfig {
  public static isPublicPath(action: RequestMethod, path: string): boolean {
    return PublicPaths.find(
      (p) => p.method === action && p.path.toLowerCase() === path.toLowerCase(),
    )
      ? true
      : false;
  }
}
