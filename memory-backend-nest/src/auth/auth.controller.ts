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
    Query,
    Res,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LoginAuthGuard } from './login.guard';
  import { SignupAuthGuard } from './signup.guard';
  import { AuthenticatedGuard } from './authenticated.guard';
  
  @Controller()
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    //@UseGuards(LoginAuthGuard)
    @Get('login')
    async login(req) {
      return req;
    }
  
    //@UseGuards(SignupAuthGuard)
    @Get('createaccount')
    async signup(@Query() query) {
      return query;
    }
  }