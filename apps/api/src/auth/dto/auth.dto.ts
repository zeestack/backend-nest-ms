import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}

export class AuthTokenDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public get accessTokenValue(): string {
    return this.accessToken;
  }

  public set accessTokenValue(value: string) {
    this.accessToken = value;
  }
}
