import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateTradingDto } from './dto/create-trading.dto';
import { UpdateTradingDto } from './dto/update-trading.dto';
import { SupabaseService } from '../common/supabase/supabase.service';

@Injectable()
export class TradingsService {
  constructor(private supabase: SupabaseService) {}

  async create(createTradingDto: CreateTradingDto) {
    const { data, error } = await this.supabase.client
      .from('trading_posts')
      .insert([
        {
          user_id: createTradingDto.user_id,
          title: createTradingDto.title,
          description: createTradingDto.description,
          price: createTradingDto.price,
          condition: createTradingDto.condition,
          category: createTradingDto.category,
          location: createTradingDto.location,
          media_files: [],
        },
      ])
      .select()
      .single();

    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    return data;
  }

  async findByUserId(userId: string) {
    const { data, error } = await this.supabase.client
      .from('trading_posts')
      .select(
        `
        *,
        user:users(
          id,
          name,
          email
        )
      `,
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase.client
      .from('trading_posts')
      .select(
        `
        *,
        user:users(
          id,
          name,
          email
        )
      `,
      )
      .order('created_at', { ascending: false });

    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client
      .from('trading_posts')
      .select(
        `
        *,
        user:users(
          id,
          name,
          email
        )
      `,
      )
      .eq('id', id)
      .single();

    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    if (!data) throw new NotFoundException(`Trading post #${id} not found`);
    return data;
  }

  async update(id: string, updateTradingDto: UpdateTradingDto) {
    const { data, error } = await this.supabase.client
      .from('trading_posts')
      .update({
        title: updateTradingDto.title,
        description: updateTradingDto.description,
        price: updateTradingDto.price,
        condition: updateTradingDto.condition,
        category: updateTradingDto.category,
        location: updateTradingDto.location,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    if (!data) throw new NotFoundException(`Trading post #${id} not found`);
    return data;
  }

  async uploadMedia(userId: string, id: string, files: Express.Multer.File[]) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException(`Trading post #${id} not found`);
    }

    const mediaFiles = await Promise.all(
      files.map(async (file) => {
        const filePath = `${userId}/${id}/${Date.now()}-${file.originalname}`;

        const { error: uploadError } = await this.supabase.client.storage
          .from('trading-post-media')
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
          });

        if (uploadError) {
          throw new HttpException(uploadError.message, HttpStatus.BAD_REQUEST);
        }

        const { data } = this.supabase.client.storage
          .from('trading-post-media')
          .getPublicUrl(filePath);

        return {
          path: filePath,
          url: data.publicUrl,
          type: file.mimetype.startsWith('image/') ? 'image' : 'video',
          size: file.size,
          created_at: new Date().toISOString(),
        };
      }),
    );

    const { data, error } = await this.supabase.client
      .from('trading_posts')
      .update({
        media_files: mediaFiles,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    if (!data) throw new NotFoundException(`Trading post #${id} not found`);
    return data;
  }

  async remove(id: string) {
    // 1. Find the post to get the media file paths
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException(`Trading post #${id} not found`);

    // 2. Remove all media files from storage
    if (post.media_files && post.media_files.length > 0) {
      const filePaths = post.media_files.map((file) => file.path);
      const { error: deleteError } = await this.supabase.client.storage
        .from('trading-post-media')
        .remove(filePaths);

      if (deleteError) {
        throw new HttpException(deleteError.message, HttpStatus.BAD_REQUEST);
      }
    }

    // 3. Delete the trading post from the database
    const { data, error } = await this.supabase.client
      .from('trading_posts')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    if (!data) throw new NotFoundException(`Trading post #${id} not found`);
    return { message: 'Trading post and media deleted successfully', data };
  }

  async removeMedia(user_id: string, id: string, fileName: string) {
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException(`Trading post #${id} not found`);

    const { error: deleteError } = await this.supabase.client.storage
      .from('trading-post-media')
      .remove([`${user_id}/${id}/${fileName}`]);

    if (deleteError)
      throw new HttpException(deleteError.message, HttpStatus.BAD_REQUEST);

    const updatedMediaFiles = post.media_files.filter(
      (file) => !file.path.includes(fileName),
    );

    const { data, error } = await this.supabase.client
      .from('trading_posts')
      .update({
        media_files: updatedMediaFiles,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    if (!data) throw new NotFoundException(`Trading post #${id} not found`);
    return {
      message: 'Media file deleted successfully',
      data,
    };
  }
}
