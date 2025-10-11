import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const post = this.postRepository.create(createPostDto);
      return await this.postRepository.save(post);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException({
          message: 'Error creating post',
          error: error.message,
        });
      }

      throw new InternalServerErrorException('Error creating post');
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      return await this.postRepository.find({
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException({
          message: 'Error fetching posts',
          error: error.message,
        });
      }

      throw new InternalServerErrorException('Error fetching posts');
    }
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    return post;
  }

  async findByAuthor(authorId: number): Promise<Post[]> {
    return await this.postRepository.find({
      where: { authorId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findPublished(): Promise<Post[]> {
    return await this.postRepository.find({
      where: { isDraft: false },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findDrafts(): Promise<Post[]> {
    return await this.postRepository.find({
      where: { isDraft: true },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(id: number, changes: UpdatePostDto): Promise<Post | void> {
    try {
      const post = await this.findOne(id);
      this.postRepository.merge(post, changes);
      return await this.postRepository.save(post);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      if (error instanceof Error) {
        throw new InternalServerErrorException({
          message: 'Could not update post',
          error: error.message,
        });
      }

      throw new InternalServerErrorException('Could not update post');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const post = await this.findOne(id);
      await this.postRepository.remove(post);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      if (error instanceof Error) {
        throw new InternalServerErrorException({
          message: 'Could not delete post',
          error: error.message,
        });
      }

      throw new InternalServerErrorException('Could not delete post');
    }
  }

  async publish(id: number): Promise<Post> {
    const post = await this.findOne(id);
    post.isDraft = false;
    return await this.postRepository.save(post);
  }

  async unpublish(id: number): Promise<Post> {
    const post = await this.findOne(id);
    post.isDraft = true;
    return await this.postRepository.save(post);
  }
}
