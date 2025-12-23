import { StorageService, UtilsService } from '@Common';
import { userConfigFactory } from '@Config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from 'dayjs';
import { OtpService } from 'src/otp';
import { PrismaService } from 'src/prisma';
import { createUser1Dto, LoginUser1Dto } from './dto/user1.dto';
import { User1 } from 'src/generated/prisma/client';
import bcrypt from "bcrypt";
import { SafeUser } from './user1.types';
import { JwtService } from '@nestjs/jwt';
  
@Injectable()
export class User1Service {
      constructor(
        @Inject(userConfigFactory.KEY)
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly prisma: PrismaService,
        private readonly utilsService: UtilsService,
        private readonly storageService: StorageService,
        private readonly otpService: OtpService,
        private readonly jwtService:JwtService,
         
      ) {}

      async signUp(data1:createUser1Dto):Promise<SafeUser>{
      
            let{name,email,password,role} = data1;
           
             
            let isUserAlreadyExists = await this.prisma.user1.findUnique({where:{email}});
            if(isUserAlreadyExists)throw new Error("User already Exists");
            
            const salt = await bcrypt.genSalt(12);
            password = await bcrypt.hash(password,salt);
            
            
            let user = await this.prisma.user1.create({data:{name,email,password,role},select:{name:true,email:true,role:true}});
            if(!user)throw new Error("User not Create | Something went wrong");
            return user;
 
      };

    
    async login(data:LoginUser1Dto){
      let{email,password} = data;

      let isUser = await this.prisma.user1.findUnique({where:{email}});
      if(!isUser) throw new UnauthorizedException("Invalid Email");

      let isPasswordCorrect = await bcrypt.compare(password,isUser.password);
      if(!isPasswordCorrect) throw new UnauthorizedException("Invalid Password");
     
      
      const payload = {
        sub:isUser.id,
        role:isUser.role
      }
      let token = this.jwtService.sign(payload);
      const safeuser = await this.prisma.user1.findUnique({where:{email},select:{name:true,email:true,role:true}});

      return {safeuser,token};
 
    };

async getAllUser(){
  let users = await this.prisma.user1.findMany({select:{name:true,email:true,role:true}});
 return  users;
}
    
}
