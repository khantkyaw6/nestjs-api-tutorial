import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('login')
  login() {
    return this.authSerivce.login();
  }

  @Post('signup')
  signup() {
    return this.authSerivce.signup();
  }
}
