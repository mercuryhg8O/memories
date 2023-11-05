import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from '../schemas/account.schema';

@Injectable()
export class MeService {
  constructor(_accountModel) {}

  getCurrentUser(me) {
    return {
      username: me.username,
      accountId: me.accountId,
    };
  }
}