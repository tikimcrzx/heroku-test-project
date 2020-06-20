import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { PreordersModule } from './preorders/preorders.module';
import { DishesModule } from './dishes/dishes.module';
import { MainModule } from './main/main.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoConfig from './configs/mongo.config';
import * as winstonConfig from './configs/winston.config';
import { WinstonModule } from 'nest-winston';
import { ContactController } from './companies/controllers/contact.controller';
import { CompanyController } from './companies/controllers/company.controller';
import { IngredientController } from './dishes/controllers/ingredient.controller';
import { DishController } from './dishes/controllers/dish.controller';
import { BranchController } from './companies/controllers/branch.controller';
import { DishPreOrderController } from './preorders/controllers/dish-preorder.controller';
import { MainController } from './main/controllers/main';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.URI),
    WinstonModule.forRoot({ transports: winstonConfig.transports }),
    CompaniesModule,
    PreordersModule,
    DishesModule,
    MainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .exclude()
      .forRoutes(
        BranchController,
        CompanyController,
        ContactController,
        DishController,
        DishPreOrderController,
        IngredientController,
        MainController,
      );
  }
}
