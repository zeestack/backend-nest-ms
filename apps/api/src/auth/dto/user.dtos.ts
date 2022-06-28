import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Exclude } from 'class-transformer';

export class UserDto {
  id?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  lastName: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude()
  _id?: any;

  @Exclude()
  __v?: any;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
