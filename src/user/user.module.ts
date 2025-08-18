import { Module } from '@nestjs/common';

//Controllers
import { UsersController } from './controllers/users/users.controller';

//Services
import { UserService } from './services/user/user.service';

@Module({
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
