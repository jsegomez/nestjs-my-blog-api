import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[] | void> {
    try {
      return await this.userRepository.find({ relations: ['profile'] });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException({
          message: 'Could not fetch users',
          error: error.message,
        });
      }

      throw new InternalServerErrorException('Could not fetch users');
    }
  }

  async findOne(id: number): Promise<User | void> {
    try {
      return await this.findUserById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      if (error instanceof Error) {
        throw new BadRequestException({
          message: 'Could not fetch user',
          error: error.message,
        });
      }

      throw new InternalServerErrorException('Could not fetch user');
    }
  }

  async create(user: CreateUserDto): Promise<User | void> {
    try {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException({
          message: 'Could not create user',
          error: error.message,
        });
      }

      throw new InternalServerErrorException('Could not create user');
    }
  }

  async update(id: number, changes: UpdateUserDTO): Promise<void | User> {
    try {
      const userData = await this.findUserById(id);
      this.userRepository.merge(userData, changes);

      return await this.userRepository.save(userData);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException({
          message: 'Could not update user',
          error: error.message,
        });
      }
    }
  }

  async remove(id: number): Promise<void> {
    const userData = await this.findUserById(id);
    await this.userRepository.remove(userData);
  }

  private async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }
}
