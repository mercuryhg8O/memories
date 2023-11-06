import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountModel } from '../schemas/account.schema';

@Injectable()
export class MeService {
  private accountModel;
  constructor() {
    this.accountModel = new AccountModel();
  }

  getCurrentUser(me) {
    return {
      username: me.username,
      accountId: me.accountId,
      bio: me.bio
    };
  }
}