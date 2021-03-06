import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelService } from '../channel/channel.service';
import { Post } from '../entities';
import { CreatePostInput, UpdatePostInput } from './inputs/post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private readonly channelService: ChannelService
  ) {}

  getPost(postId: number): Promise<Post> {
    return this.postRepository.findOne(postId, { relations: ['user', 'user.avatar'] });
  }

  getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getAllChannelPosts(channelId: number): Promise<Post[]> {
    return this.postRepository.find({ where: { channel: { id: channelId } } });
  }

  async createPost(input: CreatePostInput, userId: number): Promise<Post> {
    const channel = await this.channelService.getChannel(input.channel.id);
    if (this.channelService.validateEventChannelWritePermission(channel, userId)) {
      return this.postRepository.save({ ...input, user: { id: userId } });
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async deletePost(postId: number): Promise<Post> {
    const post = await this.getPost(postId);
    await this.postRepository.delete(post.id);
    return post;
  }

  async updatePost(input: UpdatePostInput): Promise<Post> {
    await this.postRepository.update(input.id, { ...input });
    return this.getPost(input.id);
  }
}
