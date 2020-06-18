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
      .forRoutes(ContactController);
  }
}
