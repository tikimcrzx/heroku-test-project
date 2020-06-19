import { Test, TestingModule } from '@nestjs/testing';
import { DishPreOrderController } from './dish-preorder.controller';

describe('DishPreOrderController', () => {
  let controller: DishPreOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DishPreOrderController],
    }).compile();

    controller = module.get<DishPreOrderController>(DishPreOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
