import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup swagger
  const config = new DocumentBuilder()
    .setTitle('E-Commerce-Service')
    .setDescription('e-commerce-service-document')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
  console.log(`Application running on :${await app.getUrl()}`);
  console.log(`Application document running on :${await app.getUrl()}/doc`);
}
bootstrap();
