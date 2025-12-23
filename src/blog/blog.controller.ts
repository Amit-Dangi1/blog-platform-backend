import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AccessGuard, AuthenticatedRequest, JwtAuthGuard, Roles, RolesGuard, UserType } from '@Common';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
 import { RoleGuard, RolesAllowed } from 'src/common/guards/rolesallowed.guard';
import { Role } from 'src/generated/prisma/enums';
 
@UseGuards(JwtAuthGuard,AccessGuard)
@Controller('blog')
export class BlogController {
    constructor(private readonly blogservice:BlogService){

    }
    @UseGuards(RolesGuard,RoleGuard)
    @Roles(UserType.Admin,UserType.User)  
    @RolesAllowed(Role.Author) 
    @Post("author/createBlog")
    async createBlog(@Body() data:CreateBlogDto,@Req() req:AuthenticatedRequest){
        let{id} = req.user
        return this.blogservice.createBlog(data,id);
}
    @UseGuards(RolesGuard,RoleGuard)
    @Roles(UserType.Admin,UserType.User)
    @RolesAllowed(Role.Author)
    @Patch("author/update/:id")
    async UpdateBlog(@Param("id", ParseIntPipe)blogId:number,@Body()data:UpdateBlogDto,@Req()req:AuthenticatedRequest){
        let{id,type} = req.user;
  
        return this.blogservice.updateBlog(id,type,blogId,data);
    }

    
    @UseGuards(RolesGuard)
    @Roles(UserType.Admin)
    @Delete("admin/:id")
    async deleteBlog(@Param("id",ParseIntPipe)id:number){
        return this.blogservice.deleteBlog(id);
    }

    @Get()
     async getAllUsersBlogs(){
        return this.blogservice.getAllUserBlog()
    }

    @Get(":id")
    async getBlogById(@Param("id",ParseIntPipe)id :number){
        return this.blogservice.getAllBlogsById(id);
    }

}


