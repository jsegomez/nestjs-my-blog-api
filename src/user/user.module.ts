import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Controllers
import { UsersController } from './controllers/users/users.controller';

// Entities
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

//Services
import { UserService } from './services/user/user.service';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
  ],
})
export class UserModule {}
