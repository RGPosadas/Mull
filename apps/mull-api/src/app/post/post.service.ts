import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities';
import { CreatePostInput, UpdatePostInput } from './inputs/post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  getPost(postId: number): Promise<Post> {
    return this.postRepository.findOne(postId);
  }

  getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getAllChannelPosts(channelId: number): Promise<Post[]> {
    return this.postRepository.find({ where: { channel: { id: channelId } } });
  }

  async createPost(input: CreatePostInput): Promise<Post> {
    return this.postRepository.save(input);
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
