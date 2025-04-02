import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private supabase: SupabaseService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { data, error } = await this.supabase.client
        .from('users')
        .insert([createUserDto])
        .select()
        .single();

      if (error) {
        console.log(error);
        if (error.code === '23505') {
          // Unique violation
          throw new BadRequestException('User with this email already exists');
        }
        throw new InternalServerErrorException('Failed to create user');
      }

      return data;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findAll() {
    try {
      const { data, error } = await this.supabase.client
        .from('users')
        .select('*');

      if (error) {
        throw new InternalServerErrorException('Failed to fetch users');
      }

      if (!data || data.length === 0) {
        return [];
      }

      return data;
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findOne(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }

      const { data, error } = await this.supabase.client
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        throw new InternalServerErrorException('Failed to fetch user');
      }

      return data;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findByEmail(email: string) {
    try {
      if (!email) {
        throw new BadRequestException('Email is required');
      }

      const { data, error } = await this.supabase.client
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundException(`User with email ${email} not found`);
        }
        throw new InternalServerErrorException('Failed to fetch user');
      }

      return data;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }

      const { data, error } = await this.supabase.client
        .from('users')
        .update(updateUserDto)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        if (error.code === '23505') {
          throw new BadRequestException('Email already exists');
        }
        throw new InternalServerErrorException('Failed to update user');
      }

      return data;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async remove(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }

      const { error } = await this.supabase.client
        .from('users')
        .delete()
        .eq('id', id);

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        throw new InternalServerErrorException('Failed to delete user');
      }

      return { message: 'User deleted successfully' };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
