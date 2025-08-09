import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

interface User{
    id: number;
    name: string;
    email: string;
}

@Controller('users')
export class UsersController {
    private users: User[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com'
        },
        {
            id: 3,
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com'
        },
        {
            id: 4,
            name: 'Salvador Alejandro Saavedra Gomez',
            email: 'salvador.saavedra@example.com'
        },
        {
            id: 5,
            name: 'Marcos Josue Saavedra Gomez',
            email: 'marcos.saavedra@example.com'
        }
    ];

   @Get('all')
   findAll(): User[] {
       return this.users;
   }

   @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number): User {
       const findUser = this.users.find(user => user.id === id);
       if(!findUser) throw new NotFoundException(`User with id ${id} not found`);
       return findUser;
   }

   @Post()
   create(@Body() user: User): User {
       const newUser = { ...user, id: this.users.length + 1 };
       this.users = [...this.users, newUser];
       return newUser;
   }

   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number): boolean {
       const findUser = this.users.find(user => user.id === id);
       if(!findUser) throw new NotFoundException(`User with id ${id} not found`);
       this.users = this.users.filter(user => user.id !== id);
       return true;
   }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() user: User): User {
        const index = this.users.findIndex(user => user.id === id);
        if(index === -1) throw new NotFoundException(`User with id ${id} not found`);
        this.users = this.users.map(item => item.id === id ? { ...item, ...user, id } : item);
        
        return this.users[index];
    }
}
