import { Test, TestingModule } from '@nestjs/testing';
import { DeliverService } from './deliver.service';
import { PrismaService } from '../prisma.service';
import { CreateDeliverDto } from './dto/create-deliver.dto';
import { UpdateDeliverDto } from './dto/update-deliver.dto';

describe('DeliverService', () => {
  let service: DeliverService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliverService,
        {
          provide: PrismaService,
          useValue: {
            deliver: {
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DeliverService>(DeliverService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a delivery with rating', async () => {
      const createDeliverDto: CreateDeliverDto = {
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
        rating: 1,
      };
      const result = {
        id_deliver: '111111111111111111111111',
        rating: createDeliverDto.rating,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createDeliverDto,
      };
      jest.spyOn(prismaService.deliver, 'create').mockResolvedValue(result);

      expect(await service.create(createDeliverDto)).toBe(result);
      expect(prismaService.deliver.create).toHaveBeenCalledWith({
        data: createDeliverDto,
      });
    });

    it('should create a delivery without rating', async () => {
      const createDeliverDto: CreateDeliverDto = {
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
      };
      const result = {
        id_deliver: '111111111111111111111111',
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createDeliverDto,
      };
      jest.spyOn(prismaService.deliver, 'create').mockResolvedValue(result);

      expect(await service.create(createDeliverDto)).toBe(result);
      expect(prismaService.deliver.create).toHaveBeenCalledWith({
        data: createDeliverDto,
      });
    });
  });

  describe('findMany', () => {
    it('should return all deliveries based on criteria', async () => {
      const params = {
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
        rating_e: 5,
        rating_gt: 4,
        rating_lt: 6,
      };
      const result = [
        {
          id_deliver: '111111111111111111111111',
          id_user: '111111111111111111111111',
          id_order: '111111111111111111111111',
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prismaService.deliver, 'findMany').mockResolvedValue(result);

      expect(await service.findMany(params)).toBe(result);
      expect(prismaService.deliver.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            { id_user: params.id_user },
            { id_order: params.id_order },
            {
              rating: {
                equals: params.rating_e,
                gt: params.rating_gt,
                lt: params.rating_lt,
              },
            },
          ],
        },
      });
    });
  });

  describe('update', () => {
    it('should update a delivery', async () => {
      const id_deliver = '111111111111111111111111';
      const updateDeliverDto: UpdateDeliverDto = {
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
        rating: 4,
      };
      const result = {
        id_deliver: '111111111111111111111111',
        id_user: '111111111111111111111111',
        id_order: '111111111111111111111111',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.deliver, 'update').mockResolvedValue(result);

      expect(await service.update(id_deliver, updateDeliverDto)).toBe(result);
      expect(prismaService.deliver.update).toHaveBeenCalledWith({
        where: { id_deliver },
        data: updateDeliverDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a delivery', async () => {
      const id_deliver = '1';
      const result = {
        id_deliver: '1',
        id_user: 'testUser',
        id_order: 'testOrder',
        rating: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.deliver, 'delete').mockResolvedValue(result);

      expect(await service.remove(id_deliver)).toBe(result);
      expect(prismaService.deliver.delete).toHaveBeenCalledWith({
        where: { id_deliver },
      });
    });
  });
});
