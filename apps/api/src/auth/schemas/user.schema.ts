import * as mongoose from 'mongoose';

import { Document } from 'mongoose';
import { UserDto } from '../dto';

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 12,
  },
});

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function mapUserToUserDto(user: User): UserDto {
  return new UserDto({ id: user._id.toString(), ...user.toObject() });
}
