import {
  IsArray, IsEmail, IsString, Matches,
} from 'class-validator';

export class UserDto {
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{2,12}/)
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  @Matches(/^\$2[ayb]\$[\d]{2}\$[./A-Za-z0-9]{53}$/)
  public password: string;

  @IsArray()
  public fields: string[];
}
