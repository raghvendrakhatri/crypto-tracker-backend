import { PartialType } from '@nestjs/swagger';
import { CreateUserCoinDto } from './createUserCoin.dto';

export class UpdateUserCoinDto extends PartialType(CreateUserCoinDto) {}
