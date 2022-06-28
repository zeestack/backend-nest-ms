import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Hash } from '@app/utils';
import { AuthDto, UserDto } from './dto';
import { mapUserToUserDto, User } from './schemas';
import { Model } from 'mongoose';
import { AuthTokenDto } from './dto';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: UserDto): Promise<UserDto> {
    user.password = await Hash.encrypt(user.password);
    const newUser = new this.userModel(user);
    return mapUserToUserDto(await newUser.save());
  }

  async login(authDto: AuthDto): Promise<AuthTokenDto> {
    const userDb = await this.userModel.findOne({
      email: authDto.email,
    });

    if (!Hash.compare(authDto.password, userDb.password))
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const token = await this.jwtService.signAsync({
      ...mapUserToUserDto(userDb),
    });

    return new AuthTokenDto(token);
  }
}
