import { IsInt, IsOptional, IsString } from "class-validator"


export class CreateBlogDto{

 
    @IsString()
    title:string

    @IsString()
    content:string
 


}
export class UpdateBlogDto{
    
    @IsString()
    @IsOptional()
    title:string
    
    @IsString()
    @IsOptional()
    content:string

}
  