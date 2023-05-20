import { IsString } from "@nestjs/class-validator";
import { IsDefined } from "class-validator";

export class CreateUserCoinDto {
    @IsString()
    @IsDefined()
    coinId:string
}
