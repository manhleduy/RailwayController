import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { SignupInput } from './dto/signup.dto';
import { LoginModel } from './model/login.model';
import { LoginInput } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async signup(input: SignupInput) {
    const { id, full_name, email, phone, password, role } = input;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (role === 'CUSTOMER') {
      return await this.prisma.customer.create({
        data: {
          id,
          full_name,
          email,
          phone,
          password: hashedPassword,
          rank: 0
        },
      });
    } else if (role === 'STAFF') {
      return await this.prisma.staff.create({
        data: {
          id,
          full_name,
          email,
          phone,
          password: hashedPassword,
          role: 'STAFF'
        },
      });
    } else{
      throw new Error('Invalid role');
    }
  }
  async login(input: LoginInput): Promise<LoginModel> {
    const { email, password, role } = input;
    let user: any;
    if (role === 'CUSTOMER') {
      user = await this.prisma.customer.findUnique({ where: { email } });

    } else if (role === 'STAFF') {
      user = await this.prisma.staff.findUnique({ where: { email } });
    } else {
      throw new Error('Invalid role');
    }
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    return user;

  }
}
