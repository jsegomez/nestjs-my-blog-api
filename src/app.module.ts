import { Module } from '@nestjs/common';

// Services
import { AppService } from './app.service';
import { UserService } from './services/user/user.service';

// Controllers
import { UsersController } from './controllers/users/users.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [UsersController],
  providers: [AppService, UserService],
})
export class AppModule {}
