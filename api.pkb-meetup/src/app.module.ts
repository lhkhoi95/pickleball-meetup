import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { SupabaseService } from './common/supabase/supabase.service';
import { TradingsModule } from './tradings/tradings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UsersModule,
    TradingsModule,
  ],
  providers: [SupabaseService],
})
export class AppModule {}
