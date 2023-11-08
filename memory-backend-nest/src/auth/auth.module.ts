import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { LoginStrategy } from './login.strategy';
import { SignupStrategy } from './signup.strategy';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, LoginStrategy, SignupStrategy],
})
export class AuthModule {}