import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @MaxLength(255)
  coverImage: string;

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
