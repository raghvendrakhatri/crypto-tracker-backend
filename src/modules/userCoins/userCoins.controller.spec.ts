import { Test, TestingModule } from '@nestjs/testing';
import { UserCoinsController } from './userCoins.controller';
import { UserCoinsService } from './userCoins.service';

describe('UserCoinsController', () => {
  let controller: UserCoinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCoinsController],
      providers: [UserCoinsService],
    }).compile();

    controller = module.get<UserCoinsController>(UserCoinsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
