import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Post } from 'src/post/entities/post.entity';
import { CategoryEntity } from 'src/post/entities/category.entity';

// Services
import { PostService } from 'src/post/services/post/post.service';
import { CategoryService } from 'src/post/services/category/category.service';

// Controllers
import { PostController } from 'src/post/controllers/post.controller';
import { CategoryController } from 'src/post/controllers/category.controller';

@Module({
  controllers: [PostController, CategoryController],
  providers: [PostService, CategoryService],
  imports: [TypeOrmModule.forFeature([Post, CategoryEntity])],
})
export class PostModule {}
