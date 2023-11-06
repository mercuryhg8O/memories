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
  } from '@nestjs/common';
  import { AccountService } from './account.service';
  import { MeService } from './me.service'
  
  @Controller('account')
  export class AccountController {
    constructor(private _accountService: AccountService, private meService: MeService ) {
    }
  
   // @UseGuards(AuthenticatedGuard)
    @Get('me')
    getCurrentUser(req) {
      const data = this.meService.getCurrentUser(req.account);
      return data;
    }
  
    //@UseGuards(AuthenticatedGuard)
    @Get(':username')
    async findOneByUsername(username) {
      const user = await this._accountService.findOneByUsername(username);
      return user;
    }

    @Get('user')
    async findOneById(ID){
      const split = ID.split('=')
      const user = await this._accountService.findOneById(split[split.length() - 1]);
      return user;
    }

  }
  