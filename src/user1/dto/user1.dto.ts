import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { Role } from "src/generated/prisma/enums";

export class createUser1Dto {

    @IsString()
    name:string

    @IsString()
    @IsEmail()
    email:string

    @IsString()
    @MinLength(6)
    password:string

    @IsEnum(Role)
    role:Role



};

export class LoginUser1Dto {

    @IsString()
    @IsEmail()
    email:string

    @IsString()
    password:string
};