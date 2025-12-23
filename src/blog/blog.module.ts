import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaModule } from 'src/prisma';

@Module({
  providers: [BlogService],
  controllers: [BlogController],
  imports:[PrismaModule]
})
export class BlogModule {}
