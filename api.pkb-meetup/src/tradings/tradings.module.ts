import { Module } from '@nestjs/common';
import { TradingsService } from './tradings.service';
import { TradingsController } from './tradings.controller';
import { SupabaseService } from 'src/common/supabase/supabase.service';

@Module({
  controllers: [TradingsController],
  providers: [TradingsService, SupabaseService],
})
export class TradingsModule {}
