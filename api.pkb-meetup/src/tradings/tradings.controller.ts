import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipeBuilder,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TradingsService } from './tradings.service';
import { CreateTradingDto } from './dto/create-trading.dto';
import { UpdateTradingDto } from './dto/update-trading.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('tradings')
@Controller('api/v1/tradings')
export class TradingsController {
  constructor(private readonly tradingsService: TradingsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('media', 5))
  @ApiBody({
    type: CreateTradingDto,
  })
  async create(
    @Body() createTradingDto: CreateTradingDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|mp4|mov)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024, // 10MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    files?: Express.Multer.File[],
  ) {
    try {
      const post = await this.tradingsService.create(createTradingDto);

      console.log('Post created:');
      if (files?.length) {
        const updatedPost = await this.tradingsService.uploadMedia(
          post.user_id,
          post.id,
          files,
        );
        const { user_id, ...updatedPostWithoutUserId } = updatedPost;
        return updatedPostWithoutUserId;
      }
      return post;
    } catch (error: any) {
      console.log('Error creating trading post:', error);
      throw new HttpException(
        error.message || 'Failed to update trading post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.tradingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradingsService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.tradingsService.findByUserId(userId);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('media', 5))
  async update(
    @Param('id') id: string,
    @Body() updateTradingDto: UpdateTradingDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|mp4|mov)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024, // 10MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    files?: Express.Multer.File[],
  ) {
    try {
      const post = await this.tradingsService.update(id, updateTradingDto);
      if (files?.length) {
        return this.tradingsService.uploadMedia(post.user_id, id, files);
      }
      return post;
    } catch (error: any) {
      console.log('Error creating trading post:', error);

      throw new HttpException(
        error.message || 'Failed to update trading post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.tradingsService.remove(id);
    } catch (error) {
      const status =
        typeof error.status === 'number'
          ? error.status
          : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        error.message || 'Failed to delete trading post',
        status,
      );
    }
  }

  @Delete(':id/media/:fileName')
  async removeMedia(
    @Param('id') id: string,
    @Param('fileName') fileName: string,
  ) {
    const post = await this.tradingsService.findOne(id);
    try {
      return await this.tradingsService.removeMedia(
        post.user_id,
        post.id,
        fileName,
      );
    } catch (error) {
      const status =
        typeof error.status === 'number'
          ? error.status
          : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        error.message || 'Failed to delete media',
        status,
      );
    }
  }
}
