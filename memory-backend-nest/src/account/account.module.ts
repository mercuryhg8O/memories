import { Module } from '@nestjs/common';
import { AccountService} from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeService } from './me.service';
import { DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [AccountService, MeService],
  exports: [AccountService, MeService],
})
export class UsersModule { AccountService }
