import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtils {
  constructor(private readonly jwtService: JwtService) {}
  async decode(token: string, secret: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token, { secret });
      return decodedToken;
    } catch (e) {
      return null;
    }
  }
}
