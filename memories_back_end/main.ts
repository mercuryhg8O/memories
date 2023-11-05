import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();
const authMiddleware = (req, res) => res.end('Auth middleware');
expressApp.use(authMiddleware);
expressApp.get('/test', ((req, res) => res.end('Test')))

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  await app.listen(3000);
}
bootstrap();