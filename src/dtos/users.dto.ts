import {
  IsArray, IsEmail, IsString,
} from 'class-validator';

export class UserDto {
  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsArray()
  public fields: string[];
}
