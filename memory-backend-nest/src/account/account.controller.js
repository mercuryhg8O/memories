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
  
  @Controller('account')
  export class AccountController {
    constructor(_accountService) {}
  
    @UseGuards(AuthenticatedGuard)
    @Get('me')
    getCurrentUser(req) {
      const data = this.meService.getCurrentUser(req.account);
      return data;
    }
  
    @UseGuards(AuthenticatedGuard)
    @Get(':username')
    async findOneByUsername(username) {
      const user = await this.accountService.findOneByUsername(username);
      return user;
    }
  }
  