import { ForbiddenException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { title } from 'process';
import { Role } from 'src/generated/prisma/enums';
import { UserType } from '@Common';

@Injectable()
export class BlogService {
    constructor(private readonly prisma:PrismaService){}

    async createBlog(dto:CreateBlogDto,userId:number){
        let d = await this.prisma.blog.create({data:{title:dto.title,content:dto.content,createdBy:Number(userId)}});
        
        return {message:"Blog Created Succesfully",Blog:d};
    }


async updateBlog(userId:number,type:UserType,blogId:number,dto:UpdateBlogDto){
    
    let isBlog = await this.prisma.blog.findUnique({where:{id:blogId}});
    if(!isBlog)throw new NotFoundException("Blog not Found");
if(type==UserType.Admin){
    
    let isUpdate = await this.prisma.blog.update({where:{id:blogId,},data:dto});
    return {UpdatedBlog:isUpdate,message:"Blog Updated Successfully"};
}
    if(isBlog.createdBy!==userId)throw new ForbiddenException("You cannot update this blog");

    let isUpdate = await this.prisma.blog.update({where:{id:blogId,},data:dto});
    return {UpdatedBlog:isUpdate,message:"Blog Updated Successfully"};

    
    
};

async deleteBlog(blogId:number){

    let blog = await this.prisma.blog.findUnique({where:{id:blogId}});
    if(!blog)throw new NotFoundException("Blog Not Found");

 
    let isDelete = await this.prisma.blog.delete({where:{id:blogId}})
     return {message:"Blog Successfully Deleted",deletedBlog:isDelete}
}

async getAllUserBlog(){
    let blogs = await this.prisma.blog.findMany({select:{id:true,content:true,title:true,user:{select:{id:true,firstname:true,lastname:true,email:true}}}})
    return blogs;
}

async getAllBlogsById(blogId:number){
    let isBlog = await this.prisma.blog.findUnique({where:{id:blogId}});
    if(!isBlog)throw new NotFoundException();
    return isBlog;
}
}

