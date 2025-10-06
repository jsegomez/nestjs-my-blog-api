import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}

export class CreateUserWithProfileDto extends OmitType(CreateUserDto, [
  'profile',
]) {}

export class UpdateUserDTO extends PartialType(CreateUserWithProfileDto) {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  profile: UpdateProfileDto;
}
