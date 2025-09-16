import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('AgendaMed')
    .setDescription('Sistema de agenda para profissionais da saúde.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.paths = Object.keys(document.paths).sort().reduce((acc, key) => {
    acc[key] = document.paths[key];
    return acc;
}, {});
  SwaggerModule.setup('/', app, document);
  
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
