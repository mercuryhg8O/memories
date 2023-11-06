import mongoose, { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from '../schemas/account.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(_acccountModel) {}

  async findOneById(id) {
    const user = await this.accountModel.findById(id);
    return user;
  }

  async findOneByUsername(username) {
    const user = await this.accountModel.findOne({
      username: username,
    });
    return user;
  }

  async createAccount(username, password, email, label) {
    const user = await this.findOneByUsername(username);
    if (user) {
      throw new BadRequestException();
    }
    const createdUser = new this.accountModel({
      username: username,
      password: password,
      email: email,
      label: label
    });
    await createdUser.save();
    return createdUser;
  }
}