import { Test, TestingModule } from '@nestjs/testing';
import { UserCoinsService } from './userCoins.service';

describe('UserCoinsService', () => {
  let service: UserCoinsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCoinsService],
    }).compile();

    service = module.get<UserCoinsService>(UserCoinsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
