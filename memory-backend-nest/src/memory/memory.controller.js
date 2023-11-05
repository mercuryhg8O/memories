import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { MemoryService } from './memory.service';
import * as mongoose from 'mongoose';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('memory')
export class MemoryController {
  constructor(memoryService = memoryService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('new')
  async create(createMemoryDto) {
    const memory = this.memoryService.create(
      createMemoryDto.bodyText,
      req.user._id,
    );
    return memory;
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':memoryId')
  @Bind(Param())
  @Bind(Req())
  async findOneById(params, request) {
    const memory = await this.memoryService.getMemory(params.memoryId, request.account._id);
    
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':memory/like')
  @Bind(Param())
  @Bind(Req())
  async addLike(params, request) {
    const memory = await this.memoryService.addLike(params.memoryId, request.account._id);
    if (memory != true) {
      return false;
    } else {
      return true;
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':memory/unlike')
  @Bind(Param())
  @Bind(Req())
  async removeLike(params, request) {
    const memory = await this.memoryService.removeLike(params.memoryId, request.account._id)
    await this.groupsService.removeLike(id, uid);
    if (memory != true) {
      return false;
    } else {
      return true;
    }
  }
}