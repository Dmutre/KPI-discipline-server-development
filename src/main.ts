import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('API gateway docs')
    .setDescription('API gateway documentation of camny EHR and B2C platform')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const PORT = configService.get<number>('port');
  const HOST = configService.get<string>('host');

  await app.listen(PORT, HOST, () => {
    console.log(`Server started on PORT: ${PORT}, HOST: ${HOST}`);
  });
}
bootstrap();
