import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryController } from './memory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Memory, MemorySchema } from '../schemas/memory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: MemorySchema }])
  ],
  controllers: [MemoryController],
  providers: [MemoryService],
  exports: [MemoryService],
})
export class MemoryModule {}
