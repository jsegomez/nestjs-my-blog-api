import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Post } from './entities/post.entity';

// Services
import { PostService } from './post.service';

// Controllers
import { PostController } from './post.controller';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostModule {}
