import { IsString, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserLevel } from '../enums/user-level.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'email@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: UserLevel,
    description: 'Player skill level',
    example: UserLevel.BEGINNER,
  })
  @IsEnum(UserLevel)
  level: UserLevel;
}
