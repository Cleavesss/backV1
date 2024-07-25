import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Post as P } from './posts.model';
import { title } from 'process';

@ApiTags('Посты')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({summary: 'Отправить пост'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            userId: { type: 'integer' },
            file: {
              type: 'file',
              format: 'jpg',
            },
          },
        },
      })
    @ApiResponse({status: 201, type: P})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image){
        return this.postService.create(dto, image)
    }
}
