import { Test, TestingModule } from '@nestjs/testing';
import { DeliverController } from './deliver.controller';
import { DeliverService } from './deliver.service';
import { CreateDeliverDto } from './dto/create-deliver.dto';
import { UpdateDeliverDto } from './dto/update-deliver.dto';
import { DeliverEntity } from './entities/deliver.entity';

describe('DeliverController', () => {
  let controller: DeliverController;
  let service: DeliverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliverController],
      providers: [
        {
          provide: DeliverService,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeliverController>(DeliverController);
    service = module.get<DeliverService>(DeliverService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new delivery', async () => {
      const createDeliverDto: CreateDeliverDto = {
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
        rating: 1,
      };
      const result: DeliverEntity = {
        id_deliver: '111111111111111111111111',
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
        rating: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createDeliverDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createDeliverDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of deliveries', async () => {
      const result: DeliverEntity[] = [
        {
          id_deliver: '111111111111111111111111',
          id_user: '111111111111111111111111',
          id_order: '111111111111111111111111',
          rating: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const query = {
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
        rating_e: 1,
        rating_gt: 0,
        rating_lt: 2,
      };
      jest.spyOn(service, 'findMany').mockResolvedValue(result);

      expect(
        await controller.findAll(
          query.id_user,
          query.id_order,
          query.rating_e,
          query.rating_gt,
          query.rating_lt,
        ),
      ).toBe(result);
      expect(service.findMany).toHaveBeenCalledWith({
        id_user: query.id_user,
        id_order: query.id_order,
        rating_e: query.rating_e,
        rating_gt: query.rating_gt,
        rating_lt: query.rating_lt,
      });
    });
  });

  describe('update', () => {
    it('should update a delivery', async () => {
      const id_deliver = '111111111111111111111111';
      const updateDeliverDto: UpdateDeliverDto = {
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
        rating: 2,
      };
      const result: DeliverEntity = {
        id_deliver,
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
        rating: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id_deliver, updateDeliverDto)).toBe(
        result,
      );
      expect(service.update).toHaveBeenCalledWith(id_deliver, updateDeliverDto);
    });
  });

  describe('remove', () => {
    it('should delete a delivery', async () => {
      const id_deliver = '111111111111111111111111';
      const result: DeliverEntity = {
        id_deliver,
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
        rating: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id_deliver)).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(id_deliver);
    });
  });
});
