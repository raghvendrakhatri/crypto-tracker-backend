import { IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer";
import { IsDefined, IsLowercase, Length,IsString } from "class-validator"

export class UpdateUserDto  {

    @IsOptional()
    @IsDefined()
    @IsString()
    @Length(2,20)
    @ApiProperty()
    firstName?:string;

    @IsOptional()
    @IsDefined()
    @IsString()
    @Length(2,20)
    @ApiProperty()
    lastName?:string
}

