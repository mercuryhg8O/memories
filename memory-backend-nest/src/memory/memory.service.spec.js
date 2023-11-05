import { Test, TestingModule } from '@nestjs/testing';
import { MemoryService } from './memory.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Memory, MemoryDocument, MemorySchema } from '../schemas/memory.schema';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';
// import { Account, AccountDocument, AccountSchema } from '../schema/account.schema';
import { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MemoryService', () => {
  let service = MemoryService;
  //   let accountModel: Model<AccountDocument>;
  let module = TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Memory', schema: MemorySchema }]),
      ],
      providers: [MemoryService, Memory],
    }).compile();


    service = module.get < MemoryService > (MemoryService);
    // accountModel = module.get<Model<accountDocument>>(getModelToken(Account.name));
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});