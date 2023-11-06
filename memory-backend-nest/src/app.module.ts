import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './account/account.module.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule,
    
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
