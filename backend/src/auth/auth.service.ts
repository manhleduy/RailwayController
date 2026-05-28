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

  
  
}
