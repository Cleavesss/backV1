import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiProperty, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';


class TResponse  {
    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQG1haWwucnUiLCJpZCI6MTEsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJjcmVhdGVkQXQiOiIyMDI0LTA3LTIzVDIwOjAyOjU2LjgzNVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA3LTIzVDIwOjAyOjU2LjgzNVoifV0sImlhdCI6MTcyMTkwOTUzOCwiZXhwIjoxNzIxOTk1OTM4fQ.WwwXN_uJDLGKPEzKvxf-6oZec_M048WME2VroF6S-ww', description: 'Токен'})
    token: string
}
@ApiTags('Авториация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Аутентификация пользователя'})
    @ApiResponse({status: 200, description: 'Вовзращается access JWT Token', type: TResponse})
    @Post('/login')
    @HttpCode(200)
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 201, description: 'Вовзращается access JWT Token', type: TResponse})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }
}
