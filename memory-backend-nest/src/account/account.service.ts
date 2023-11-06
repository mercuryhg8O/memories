import * as mongoose from 'mongoose';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AccountModel } from 'src/schemas/account.schema';

@Injectable()
export class AccountService {
  private _accountModel;
  accountModel: any;
  constructor() {
    this.accountModel = new AccountModel();
  }

  async findOneById(id) {
    const user = await this._accountModel.findById(id);
    return user;
  }

  async findOneByUsername(username) {
    const user = await this.accountModel.findOne({
      username: username,
    });
    return user;
  }

  async createAccount(username, password, email, bio) {
    //const user = await this.findOneByUsername(username);
    //if (user) {
    //  throw new BadRequestException();
    //}
    const createdUser = new AccountModel({
      username: username,
      password: password,
      email: email,
      bio: bio
    });
    await createdUser.save();
    return createdUser;
  }
}