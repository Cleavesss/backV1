import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags("Разрешение на запросы к сторонним API")
@Controller('canDoIt')
export class CanDoItController {

    @ApiOperation({summary: "Перед каждым запросом на сторонее API можно/нужно делать это"})
    @ApiResponse({status: 200, type: Boolean})
    @UseGuards(JwtAuthGuard)
    @Get()
    CanDoIt(){
        return true
    }
}
