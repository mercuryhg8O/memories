import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { validate } from 'class-validator';

@Injectable()
export class SignupStrategy extends PassportStrategy(Strategy, 'signup') {
  constructor(authService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(req, _username, _password) {
    const signupDto = new SignupDto();
    signupDto.username = req.body.username;
    signupDto.email = req.body.email;
    signupDto.password = req.body.password;
    signupDto.label = req.body.label;
    const errors = await validate(signupDto);
    if (errors.length > 0) {
      throw new BadRequestException();
    }

    const user = await this.authService.createUser(
      signupDto.username,
      signupDto.password,
      signupDto.email,
      signupDto.label
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
