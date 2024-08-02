import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return {
      msg: 'Login',
    };
  }

  signup() {
    return {
      msg: 'Sign Up',
    };
  }
}
