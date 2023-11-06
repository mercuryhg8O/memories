import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    Res,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LoginAuthGuard } from './login.guard';
  import { SignupAuthGuard } from './signup.guard';
  import { AuthenticatedGuard } from './authenticated.guard';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @UseGuards(LoginAuthGuard)
    @Post('login')
    async login(req) {
      return req.user;
    }
  
    @UseGuards(SignupAuthGuard)
    @Post('signup')
    async signup(req) {
      return req.user;
    }
  }
  