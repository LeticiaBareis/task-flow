import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [TaskModule,PrismaModule, UserModule, CategoryModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
