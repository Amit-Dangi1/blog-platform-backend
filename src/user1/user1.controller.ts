import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User1Service } from './user1.service';
import { createUser1Dto, LoginUser1Dto } from './dto/user1.dto';
import { JwtAuthGuard } from '@Common';
import { Roles, RolesGuard } from 'src/blog/decorators/roles.guard';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('user1')
export class User1Controller {

    constructor(private user1Service:User1Service){}

    @Post("signup")
    signUp(@Body() data:createUser1Dto){  
        return this.user1Service.signUp(data);
    }


  @Get("AllUser")
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("Admin") 
  getAllUser(){
    return this.user1Service.getAllUser();
  }
    @Post("login")
    login(@Body()data:LoginUser1Dto){
        return this.user1Service.login(data);
    }
}
