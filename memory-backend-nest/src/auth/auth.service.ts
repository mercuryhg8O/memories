import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(accountService) {}

  async validateUser(username, password) {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return user;
      }
    }
    return null;
  }

  async createUser(username, email, password, label) {
    const user = await this.accountService.createUser(
      username,
      email,
      password,
      label
    );
    return user;
  }
}