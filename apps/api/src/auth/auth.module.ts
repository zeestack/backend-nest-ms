import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DbModule } from '@app/db';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { userProviders } from './auth.provider';

@Module({
  imports: [DbModule, JwtModule.register({ secret: 'secret' })],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders],
})
export class AuthModule {}
