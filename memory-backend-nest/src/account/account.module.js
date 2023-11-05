import { Module } from '@nestjs/common';
import { AccountService} from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../schemas/account.schema';
import { MeService } from './me.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.username, schema: AccountSchema}]),
  ],
  controllers: [AccountController],
  providers: [AccountService, MeService],
  exports: [AccountService, MeService],
})
export class UsersModule {}
