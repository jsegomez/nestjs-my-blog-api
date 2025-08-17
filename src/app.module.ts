import { Module } from '@nestjs/common';

// Services
import { AppService } from './app.service';
import { UserService } from './services/user/user.service';

// Controllers
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [AppService, UserService],
})
export class AppModule {}
