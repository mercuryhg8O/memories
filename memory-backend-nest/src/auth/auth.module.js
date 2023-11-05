import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from '../account/accountmodule';
import { PassportModule } from '@nestjs/passport';
import { LoginStrategy } from './login.strategy';
import { SignupStrategy } from './signup.strategy';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session.serializer';

@Module({
  controllers: [AuthController],
  imports: [AccountModule, PassportModule.register({ session: true })],
  providers: [AuthService, LoginStrategy, SignupStrategy, SessionSerializer],
})
export class AuthModule {}