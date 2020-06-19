import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DishPreOrder } from './schemas/dish-preorder.schema';
import { DishPreOrderController } from './controllers/dish-preorder.controller';
import { DishPreOrderService } from './services/dish-preorder.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'DishPreOrder',
        schema: DishPreOrder,
        collection: 'dishespreorders',
      },
    ]),
  ],
  controllers: [DishPreOrderController],
  providers: [DishPreOrderService],
  exports: [MongooseModule],
})
export class PreordersModule {}
