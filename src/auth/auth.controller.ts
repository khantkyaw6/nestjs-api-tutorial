import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authSerivce.login(dto);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor(''))
  signup(@Body() dto: AuthDto) {
    return this.authSerivce.signup(dto);
  }
}
