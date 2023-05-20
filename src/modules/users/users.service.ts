import { Body, Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUserDto } from '../authentication/dto/currentUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import * as AWS from "aws-sdk";
import fs from 'fs';
import axios  from 'axios';
import * as FormData from 'form-data' 
import { Readable} from 'stream'



@Injectable()
export class UsersService {
  private awsBucketName;
  private awsAccessKeyId;
  private awsSecretKey;
  private s3;
  private awsRegion;
  constructor( 
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly configService:ConfigService
  ){
    this.awsBucketName = this.configService.get<string>('aws.bucketName');
    this.awsAccessKeyId = this.configService.get<string>('aws.accessKeyId');
    this.awsSecretKey = this.configService.get<string>('aws.secretKey');
    this.awsRegion = this.configService.get<string>('aws.region');
    this.s3 = new AWS.S3
    ({
        accessKeyId: this.awsAccessKeyId,
        secretAccessKey: this.awsSecretKey,
        region:this.awsRegion
    });
  }

  private generateRandomFileName():string{
    const length = Math.floor(Math.random() * 20) + 1;
    const validCharacters = 'abcdefghoijklonpqrstuvwxyz';
    let fileName = '';

    for(let i=0; i<length;++i){
      const randomIndex = Math.floor(Math.random() * (validCharacters.length-1));
      fileName+=validCharacters[randomIndex]
    }

    fileName += '.jpeg'
    return fileName;

  }
  async findOne(user:CurrentUserDto):Promise<User> {
    const userProfile = await this.userRepository.findOne({
      where:{
        id:user.userId
      }
    });

    delete userProfile.password;
    return userProfile;
  }
  async update(user:CurrentUserDto,@Body() payload:UpdateUserDto,@UploadedFile() file: Express.Multer.File) {
    let location;
    if(file){
      const buffer = file.buffer;
      const fileName = this.generateRandomFileName();
      // location = await this.uploadFile(buffer,fileName);
      console.log('cwcbicvcihvck');
      const uploadedFile = await this.cartoonifyImage(file);

      // console.log(uploadedFile);
    }

    const userData = {
      ...payload,
    }
   
    if(location){
      userData['profile'] = location;
    }
   
   
   await this.userRepository.save({id:user.userId,...userData});
   const userProfile = await this.userRepository.findOne({where:{id:user.userId}});
   return userProfile;
  }


  async uploadFile(dataBuffer: Buffer, fileName: string) {
    console.log(this.awsAccessKeyId,this.awsBucketName,this.awsSecretKey,this.awsRegion);
    const uploadResult = await this.s3.upload({
        Bucket: this.awsBucketName,
        Body: dataBuffer,
        Key: `${uuidv4()}-${fileName}`,
        ACL: "public-read",
        ContentType:'image/jpeg'
    }).promise();

    const fileLocation = uploadResult.Location;
    return fileLocation;
}



async cartoonifyImage(file:any){
  let data = new FormData();
  data.append('image', file.buffer,'yuvi.jpeg');
  console.log(file)
  data.append('type', 'amcartoon');
  
console.log(file)

console.log('dbebwiievivihe');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation',
  headers: { 
    'X-RapidAPI-Host': 'cartoon-yourself.p.rapidapi.com', 
    'X-RapidAPI-Key': 'f1f3a7b285mshb43ba9ebd06f2cep16de90jsn04e7b5f38347', 
    ...data.getHeaders()
  },
  data : data
};

console.log(config);

try {
const response = await axios.request(config);
console.log(response.data);
} catch (error) {
console.error(error);
}
 }



}
