import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(body: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(body);
    await this.postRepository.save({
      ...post,
      user: { id: body.userId },
    });

    return this.findOne(post.id);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['user.profile'],
    });

    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user.profile'],
    });

    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  async update(id: number, changes: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    this.postRepository.merge(post, changes);
    return await this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
  }
}
