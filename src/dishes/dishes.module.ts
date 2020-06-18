import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientSchema, DishSchema } from './schemas';
import { IngredientService } from './services/ingredient.service';
import { IngredientController } from './controllers/ingredient.controller';
import { DishService } from './services/dish.service';
import { DishController } from './controllers/dish.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Ingredient',
        schema: IngredientSchema,
        collection: 'ingredients',
      },
      {
        name: 'Dish',
        schema: DishSchema,
        collection: 'dishes',
      },
    ]),
  ],
  providers: [DishService, IngredientService],
  controllers: [DishController, IngredientController],
  exports: [MongooseModule],
})
export class DishesModule {}
