import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.module";
import { User } from "src/users/users.model";

interface PostCreationAttrs {
    title: string;
    constent: string;
    userId: number;
    image: string;
}


@Table({
    tableName: 'posts'
})
export class Post extends Model<Post, PostCreationAttrs> {


    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Заголовок поста', description: 'Заголовок поста'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: 'Контентная часть поста', description: 'Контентная часть поста'})
    @Column({type: DataType.STRING,  allowNull: false})
    content: string;


    @ApiProperty({example: '12344556778аваыуащыушарыу.jpg', description: 'Сгенерированное имя для файла-изображения'})
    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    author: User
}