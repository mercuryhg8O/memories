import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(authService) {
    super();
  }

  async validate(username, password) {
    const user = await this.authService.validateAccount(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}