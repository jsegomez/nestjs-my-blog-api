import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDTO } from 'src/dto/user.dto';
import { User } from 'src/user/models/user.model';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
    },
    {
      id: 4,
      name: 'Salvador Alejandro Saavedra Gomez',
      email: 'salvador.saavedra@example.com',
    },
    {
      id: 5,
      name: 'Marcos Josue Saavedra Gomez',
      email: 'marcos.saavedra@example.com',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.findUserById(id);
  }

  create(user: CreateUserDto): User {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users = [...this.users, newUser];
    return newUser;
  }

  update(id: number, user: UpdateUserDTO): User {
    const userData = this.findUserById(id);
    this.users = this.users.map((item) =>
      item.id === id ? { ...userData, ...user, id } : item,
    );

    return this.findUserById(id);
  }

  remove(id: number): boolean {
    const userData = this.findUserById(id);
    this.users = this.users.filter((user) => user.id !== userData.id);
    return true;
  }

  private findUserById(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }
}
