import mongoose, { Model } from 'mongoose';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountModel } from '../schemas/account.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  
  private _accountModel;
  constructor() {
    this._accountModel = new AccountModel();
  }

  async findOneById(id) {
    const user = await this._accountModel.findById(id);
    return user;
  }

  async findOneByUsername(username) {
    const user = await this._accountModel.findOne({
      username: username,
    });
    return user;
  }

  async createAccount(username, password, email, bio) {
    const user = await this.findOneByUsername(username);
    if (user) {
      throw new BadRequestException();
    }
    const createdUser = new this._accountModel({
      username: username,
      password: password,
      email: email,
      bio: bio
    });
    await createdUser.save();
    return createdUser;
  }
}