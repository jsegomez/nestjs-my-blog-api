import {
  BadRequestException,
  Injectable,
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

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['profile'] });
  }

  async findOne(id: number): Promise<User> {
    return await this.findUserById(id);
  }

  async create(user: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (existingUser) throw new BadRequestException('User already exists');

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async update(id: number, changes: UpdateUserDTO): Promise<User> {
    try {
      const userData = await this.findUserById(id);
      this.userRepository.merge(userData, changes);

      return await this.userRepository.save(userData);
    } catch (error) {
      throw new BadRequestException('Error updating user');
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
