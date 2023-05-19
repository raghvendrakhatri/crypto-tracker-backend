import {Length,IsDefined,IsEmail,IsString,IsLowercase} from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
   
    @IsDefined()
    @IsEmail()
    @IsString()
    @Length(8,30)
    @IsLowercase()
    @ApiProperty()
    email:string

    @IsDefined()
    @Length(5,30)
    @IsString()
    @ApiProperty()
    password:string
}
