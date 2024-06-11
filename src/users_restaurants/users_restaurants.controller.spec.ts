import { Test, TestingModule } from '@nestjs/testing';
import { UsersRestaurantsController } from './users_restaurants.controller';
import { UsersRestaurantsService } from './users_restaurants.service';

describe('UsersRestaurantsController', () => {
  let controller: UsersRestaurantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersRestaurantsController],
      providers: [UsersRestaurantsService],
    }).compile();

    controller = module.get<UsersRestaurantsController>(UsersRestaurantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
