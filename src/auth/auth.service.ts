import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) {
        throw new ForbiddenException('Credentials Incorrect');
      }

      const matchPassword = await argon.verify(user.hash, dto.password);

      if (!matchPassword) {
        throw new ForbiddenException('Credential Incorrect');
      }

      delete user.hash;
      return {
        msg: 'Login',
        data: user,
      };
    } catch (error) {}
  }

  async signup(dto: AuthDto) {
    try {
      const hashedPassword = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      delete user.hash;

      return {
        msg: 'Sign Up',
        data: user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}
