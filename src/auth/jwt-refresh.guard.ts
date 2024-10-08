import { CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtRefreshGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const token = req.cookies.refreshToken
            const user = this.jwtService.verify(token)
            return true;

        } catch (e) {
            console.log(e)
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }
}