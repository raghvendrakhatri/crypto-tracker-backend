import {Length,IsDefined,IsEmail,Matches,IsString,IsLowercase} from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @IsDefined()
    @IsString()
    @Length(2,20)
    @ApiProperty()
    firstName:string

    @IsDefined()
    @IsString()
    @Length(2,20)
    @ApiProperty()
    lastName:string


    @IsDefined()
    @IsEmail()
    @IsString()
    @Length(8,30)
    @IsLowercase()
    @ApiProperty()
    email:string

    @Length(5,30)
    @IsString()
    @ApiProperty()
    password:string
}
