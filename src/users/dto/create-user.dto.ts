import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адресс'})
    readonly email: string;
    
    @ApiProperty({example: '123', description: 'Пароль'})
    readonly password: string;
}