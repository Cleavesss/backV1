import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BanUserDto {
    @ApiProperty({example: '1', description: 'Id пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly userId: number;

    @ApiProperty({example: 'Хамство', description: 'Примчина бана'})
    @IsString({message: "Должно быть строкой"})
    readonly banReason: string; // Миграции нужны, опечатка
}