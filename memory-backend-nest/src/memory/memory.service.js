import mongoose, { Model } from 'mongoose';
import { AccountDocument } from '../schemas/account.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MemoryService {
    constructor(_memoryModel) {}
    
    async create(bodyText, tags, photos, visibility) {
        const createdMemory = new this.memoryModel({
            bodyText: bodyText,
            accountId: account._id,
            tags: tags,
            location: Location,
            likes: 0,
            photos: Image,
            visibility: Visibility,
        });
        await createdMemory.save();
        return createdMemory;
    }
    
    async addLike(id, uid) {
        const memory = await this.memoryModel.findById(id);
        if (!memory) {
            throw new BadRequestException(
                'Memory Not Found',
            );
        }
        if (await this.service.findLike(id, uid) != -1) {
            throw new UnAuthorizedException(
                'Already Liked',
            )
        } else {
            memory.likes++;
            await memory.save();
            this.UserService.likeMemory(id, uid);
        }
        user.likedMemories.push(id);
        await user.save();
    }

    async removeLike(id, uid) {
        const memory = await this.memoryModel.findById(id);
        if (!memory) {
            throw new BadRequestException(
                'Memory Not Found',
            );
        } if (await this.service.findLike(id, uid) != 1) {
            throw new UnAuthorizedException(
                'Never Liked',
            )
        } else {
            memory.likes--;
            await memory.save();
        }
        user.likedMemories.splice(user.likedMemories.indexof(id), 1);
        await user.save();
    }

    async findMemoryById(id) {
        const memory = await this.memoryModel.findById(id);
        return memory;
    }
}