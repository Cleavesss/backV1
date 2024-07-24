import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.module";
import { RolesModule } from "src/roles/roles.module";
import { AuthModule } from "src/auth/auth.module";


@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles]),
        RolesModule,
        forwardRef(() => AuthModule)
    ],
    exports: [
        UserService,
    ]
    
})
export class UserModule {}