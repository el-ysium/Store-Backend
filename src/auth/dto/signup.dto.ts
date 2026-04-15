import {
  IsEmail, IsString, IsNotEmpty,
  MinLength, Matches,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  email?: string;

  @IsString()
  @Matches(/^[+]?[\d\s\-()]{7,15}$/, { message: 'Invalid phone number' })
  phoneNumber?: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password?: string;
}