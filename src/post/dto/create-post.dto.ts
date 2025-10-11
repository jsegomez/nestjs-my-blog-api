import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsString()
  @MaxLength(255)
  coverImage: string;

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;
}
