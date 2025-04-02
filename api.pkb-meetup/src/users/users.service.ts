import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private supabase: SupabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { data, error } = await this.supabase.client
      .from('users')
      .insert([createUserDto])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase.client
      .from('users')
      .select('*');

    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error?.code === 'PGRST116') {
      throw new NotFoundException('User not found');
    }
    if (error) throw error;
    return data;
  }

  async findByEmail(email: string) {
    const { data, error } = await this.supabase.client
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error?.code === 'PGRST116') {
      throw new NotFoundException('User not found');
    }
    if (error) throw error;
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { data, error } = await this.supabase.client
      .from('users')
      .update(updateUserDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase.client
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { message: 'User deleted successfully' };
  }
}
