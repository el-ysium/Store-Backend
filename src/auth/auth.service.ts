import {
  Injectable, ConflictException, UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    // 1. Check email isn't already taken
    const exists = await this.usersService.findByEmail(dto.email!);
    if (exists) throw new ConflictException('Email already in use');

    // 2. Hash the password — NEVER store plain text
    const hashedPassword = await bcrypt.hash(dto.password!, 10);

    // 3. Save the user
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    // 4. Return a token immediately (user is logged in after signup)
    return this.generateToken(user.id!, user.email!);
  }

  async login(dto: LoginDto) {
    // 1. Find user by email
    const user = await this.usersService.findByEmail(dto.email!);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // 2. Compare submitted password against stored hash
    const passwordValid = await bcrypt.compare(dto.password!, user.password!);
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    // 3. Issue a token
    return this.generateToken(user.id!, user.email!);
  }

  private generateToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}