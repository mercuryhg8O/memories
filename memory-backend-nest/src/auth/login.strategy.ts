import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: any, password: any) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return false;
    }
    return user;
  }
}