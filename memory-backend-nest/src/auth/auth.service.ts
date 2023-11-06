import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService) {}

  async validateUser(username, password) {
    const user = await this.accountService.findOneByUsername(username);
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
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