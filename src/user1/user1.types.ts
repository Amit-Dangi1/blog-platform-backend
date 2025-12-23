import { Role } from "src/generated/prisma/enums"

export type SafeUser = {
    name:string,
    email:string,
    role:Role
    
}