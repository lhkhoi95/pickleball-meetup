import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserLevel, SKILL_LEVELS } from '../enums/user-level.enum';
import { FREQUENCY, PlayFrequency } from '../enums/user-frequency.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'user_id_123',
    description: 'The unique identifier for the user',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'email@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    enum: UserLevel,
    description: 'Player skill level',
    example: UserLevel.BEGINNER,
    examples: SKILL_LEVELS.map((level) => level.value),
  })
  @IsEnum(UserLevel)
  @IsNotEmpty()
  skill_level: UserLevel;

  @ApiProperty({
    enum: PlayFrequency,
    description: 'How often the user plays',
    example: PlayFrequency.ONCE,
    examples: FREQUENCY.map((freq) => freq.value),
  })
  @IsEnum(PlayFrequency)
  @IsNotEmpty()
  frequency: PlayFrequency;

  @ApiProperty({
    example: 'San Francisco, CA',
    description: "User's preferred playing location",
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: "User's profile picture URL",
  })
  @IsString()
  image_url: string;
}
