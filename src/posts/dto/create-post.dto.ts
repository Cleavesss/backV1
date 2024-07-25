import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {

    @ApiProperty({example: 'Заголовок поста', description: 'Заголовок поста'})
    @IsString({message: "Должно быть строкой"})
    readonly title: string;

    @ApiProperty({example: 'Контентная часть поста', description: 'Контентная часть поста'})
    @IsString({message: "Должно быть строкой"})
    readonly content: string;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: "Должно быть строкой"})
    readonly userId: number;
}