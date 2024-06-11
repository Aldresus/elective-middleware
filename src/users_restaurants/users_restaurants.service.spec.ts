import { Test, TestingModule } from '@nestjs/testing';
import { UsersRestaurantsService } from './users_restaurants.service';

describe('UsersRestaurantsService', () => {
  let service: UsersRestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRestaurantsService],
    }).compile();

    service = module.get<UsersRestaurantsService>(UsersRestaurantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
