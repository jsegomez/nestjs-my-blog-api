import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  avatar: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
