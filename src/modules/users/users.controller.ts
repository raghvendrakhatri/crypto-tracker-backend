import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../authentication/guards';
import { CurrentUser } from '../authentication/decorators';
import { CurrentUserDto } from '../authentication/dto/currentUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(JwtAuthGuard)
  @Get()
  async find(@CurrentUser() user:CurrentUserDto) {
    return this.usersService.findOne(user);
  }


  @UseGuards(JwtAuthGuard)
  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  async update(@CurrentUser() user:CurrentUserDto,@Body() payload:UpdateUserDto,@UploadedFile() file?: Express.Multer.File) {
    console.log(payload);
    const result = await this.usersService.update(user,payload,file);
    return result;
  }
}
