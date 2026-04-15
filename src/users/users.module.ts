import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // registers User repo for injection
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],   // AuthModule needs UsersService, so we export it
})
export class UsersModule {}