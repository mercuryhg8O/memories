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
  import { AccountService } from 'src/account/account.service';
  import { LoginStrategy } from './login.strategy';
  @Controller()
  export class AuthController {
    constructor(private authService: AuthService, private accountService: AccountService) {}
  
    //@UseGuards(LoginAuthGuard)
    @Get('login')
    async login(@Query() query) {
      const loginStrategy = new LoginStrategy(this.authService);
      const user = loginStrategy.validate(query.email,query.password);
      return user;
    }
  
    //@UseGuards(SignupAuthGuard)
    @Get('createaccount')
    async signup( @Query() query) {
      const accountService = new AccountService();
      accountService.createAccount( query.username, query.password, query.email, query.bio);
      return query;
    }

    @Get('user')
    async findOneById(@Query() query){
      const user = await this.accountService.findOneByAccountID(query.accountId as number);
      return user;
    }
  }