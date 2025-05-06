import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
  ArrayMaxSize,
  IsArray,
  IsDecimal,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemCategory, ItemCondition } from '../enums/trading-item';

export class CreateTradingDto {
  @ApiProperty({
    example: 'user_id',
    description: 'The ID of the user creating the trading post',
  })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    example: 'title',
    description: 'The title of the trading post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'description',
    description: 'The description of the trading post',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '20.00',
    format: 'decimal',
    type: 'number',
    description: 'The price of the trading post',
  })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    enum: ItemCondition,
    description: 'The condition of the item',
    example: ItemCondition.NEW,
    examples: Object.values(ItemCondition),
  })
  @IsEnum(ItemCondition)
  @IsNotEmpty()
  condition: ItemCondition;

  @ApiProperty({
    enum: ItemCategory,
    description: 'The category of the item',
    example: ItemCategory.PADDLES,
    examples: Object.values(ItemCategory),
  })
  @IsEnum(ItemCategory)
  @IsNotEmpty()
  category: ItemCategory;

  @ApiProperty({
    description: 'The location of the item',
    example: 'San Francisco, CA',
  })
  location: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Media files (images/videos) for the trading post',
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => o.media?.length > 0)
  @ArrayMaxSize(5)
  @IsArray()
  media?: Express.Multer.File[];
}
