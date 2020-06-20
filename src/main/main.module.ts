import { Module } from '@nestjs/common';
import { MainController } from './controllers/main';

@Module({
  controllers: [MainController],
})
export class MainModule {}
