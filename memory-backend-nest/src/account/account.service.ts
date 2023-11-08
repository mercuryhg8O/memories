import * as mongoose from 'mongoose';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AccountModel } from 'src/schemas/account.schema';


@Injectable()
export class AccountService {
  private accountModel;
  constructor() {
    this.accountModel = new AccountModel();
  }

  async findOneById(id) {
    const user = await this.accountModel.findById(id);
    return user;
  }

  async findOneByAccountID(id){
    const user = await AccountModel.findOne({
      accountId: id,
    });
    return user;
  }

  async findOneByUsername(username1) {
    const user = await AccountModel.findOne({
      username: username1,
    });
    return user;
  }

  async findOneByEmail(email1) {
    const user = await AccountModel.findOne({
      email : email1,
    });
    console.log(user);
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
      bio: bio,
      accountId: Math.ceil(Math.random()*1000),
    });
    await createdUser.save();
    return createdUser;
  }
}