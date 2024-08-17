import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/user.service';
import * as bcript from 'bcryptjs'
import { User } from 'src/users/users.model';
import { access } from 'fs';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {}

   
    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto);
        const {accessToken, refreshToken} = await this.generatePairToken(user)
        return {
            accessToken, 
            refreshToken
        }
    }

   
    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUsersByEmail(userDto.email);
        if (candidate){
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcript.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return user
    }

    async refresh(user: {email: string, id: number, roles: any[]}){
        const accessToken =  await this.generateAccessToken(user) 
        return {
            accessToken 
        } 
    }

    private async generateAccessToken(payload){
        return this.jwtService.sign(payload)
    }

    private async generatePairToken(user: User){
        const payload = {email: user.email, id: user.id, roles: user.roles }
        const accessToken = this.jwtService.sign(payload)
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '7d'})
        return {
            accessToken,
            refreshToken
        }
    }

    private async validateUser(userDto: CreateUserDto){
        const user = await this.userService.getUsersByEmail(userDto.email);
        const passwordEquals = await bcript.compare(userDto.password, user.password)
        if (user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
}
