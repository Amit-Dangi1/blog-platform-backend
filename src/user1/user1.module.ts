import { Module } from '@nestjs/common';
import { User1Service } from './user1.service';
import { User1Controller } from './user1.controller';
import { PrismaModule } from 'src/prisma';
import { OtpModule } from 'src/otp';
import { JwtModule } from '@nestjs/jwt';
 

@Module({
  imports:[PrismaModule,OtpModule,JwtModule.register({secret:process.env.JWT_SECRET,signOptions:{expiresIn:"1d"}})],
  providers: [User1Service],
  controllers: [User1Controller],
  exports:[User1Service,JwtModule],
})
export class User1Module {}
