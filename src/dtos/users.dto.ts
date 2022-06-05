import { IsArray, IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsArray()
  public fields: string[];

  @IsBoolean()
  public verified: boolean;
}
