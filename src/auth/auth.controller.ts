import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiProperty, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { JwtService } from "@nestjs/jwt";


class TResponse  {
    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQG1haWwucnUiLCJpZCI6MTEsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJjcmVhdGVkQXQiOiIyMDI0LTA3LTIzVDIwOjAyOjU2LjgzNVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA3LTIzVDIwOjAyOjU2LjgzNVoifV0sImlhdCI6MTcyMTkwOTUzOCwiZXhwIjoxNzIxOTk1OTM4fQ.WwwXN_uJDLGKPEzKvxf-6oZec_M048WME2VroF6S-ww', description: 'Токен'})
    accessToken: string
}
@ApiTags('Авториация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private jwtService: JwtService) {}

    @ApiOperation({summary: 'Аутентификация пользователя'})
    @ApiResponse({status: 200, description: 'Вовзращается access JWT Token', type: TResponse})
    @Post('/login')
    @HttpCode(200)
    async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response){
        const {accessToken, refreshToken} = await this.authService.login(userDto)
        response.cookie('refreshToken', refreshToken, {httpOnly: true})
        return {accessToken}
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 201, description: 'Вовзращается access JWT Token', type: TResponse})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }

    @ApiOperation({summary: "Обновление access токена"})
    @ApiResponse({status: 201, description: 'Вовзращается access JWT Token', type: TResponse})
    @UseGuards(JwtRefreshGuard)
    @Post('/refresh')
    refresh(@Req() request: Request){
        const {email, id, roles} = this.jwtService.verify(request.cookies.refreshToken)
        return this.authService.refresh({email, id, roles})
    }

    @ApiOperation({summary: "Выход"})
    @ApiResponse({status: 200, description: 'Вовзращается...'})
    @UseGuards(JwtRefreshGuard)
    @Post('/logout')
    @HttpCode(200)
    logout(@Req() request: Request,  @Res({ passthrough: true }) response: Response){
        response.clearCookie("refreshToken")
        return {detail: "success"}
    }
}
