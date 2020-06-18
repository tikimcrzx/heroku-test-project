import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as helmet from 'helmet';
import * as server from './configs/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(server.PORT);
}
bootstrap();
