import { Test, TestingModule } from '@nestjs/testing';
import { DishPreOrderService } from './dish-preorder.service';

describe('DishPreOrderService', () => {
  let service: DishPreOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DishPreOrderService],
    }).compile();

    service = module.get<DishPreOrderService>(DishPreOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
