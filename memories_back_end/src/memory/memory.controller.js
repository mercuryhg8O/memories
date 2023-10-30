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
  async findOneById(id = memory._id) {
    const memory = await this.memoryService.findOneById(id);
    if (!memory) {
      throw new NotFoundException();
    }
    return memory;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':memory/like')
  async addLike(id = memory._id, uid = req.account._id) {
    await this.memoryService.addLike(id, uid);
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':memory/unlike')
  async removeLike(id = memory._id, uid = req.account._id) {
    await this.groupsService.removeLike(id, uid);
    return group;
  }
}