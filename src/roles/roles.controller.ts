import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiProperty, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from './roles.model';

@ApiTags('Работа с ролями')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: 'Создать роль пользователя'})
    @ApiResponse({status: 201, type: Role})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @ApiOperation({summary: 'Запросить конкретную роль'})
    @ApiResponse({status: 200, type: Role})
    // @ApiBearerAuth()
    @Get('/:value')
    getByValue(@Param('value') value: string){
        return this.roleService.getRoleByValue(value)
    }
}
