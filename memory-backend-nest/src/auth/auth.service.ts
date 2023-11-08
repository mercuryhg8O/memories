import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
//import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService) {}

  async validateUser(email, password) {
    const user = await this.accountService.findOneByEmail(email);
    if (user) {
      console.log('User Exists');
      if (password == user.password) {
        return true;
      }
    }
    return false;
  }

  async createUser(username, email, password, bio) {
    const user = await this.accountService.createAccount(
      username,
      email,
      password,
      bio
    );
    return user;
  }
}