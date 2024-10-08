import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
// import { ValidationPipe } from "@nestjs/common";
import { ValidationPipe } from "./pipes/validation.pipe";
import * as cookieParser from 'cookie-parser';


async function  start() {
    const PORT = process.env.PORT || 5001;
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
    .setTitle('Сваггер')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Ilya')
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

    app.use(cookieParser())
    app.enableCors({
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`Server starts at PORT = ${PORT}`) )
}


start()