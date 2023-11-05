import { Test, TestingModule } from '@nestjs/testing';
import { MemoryController } from './memory.controller';
import { MemoryService } from './memory.service';
import { Memory, MemorySchema } from '../schemas/memory.schema';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

describe('MemoryController', () => {
  let controller = MemoryController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Memory', schema: MemorySchema }]), 
      ],
      controllers: [MemoryController],
      providers: [MemoryService],
    }).compile();

    controller = module.get<MemoryController>(MemoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});