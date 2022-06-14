import 'reflect-metadata';
import { JobType } from '@types/users/user.job.type';
import { Type } from 'class-transformer';
import {
  IsArray, IsEmail, IsString, Matches, ValidateNested,
} from 'class-validator';

export class UserDto {
  @IsString()
  @Matches(
    /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,10}/,
    { message: 'username must match regular expression' },
  )
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    { message: 'password must match regular expression' },
  )
  public password: string;

  @ValidateNested({ each: true })
  @Type(() => JobType)
  public fields: JobType[];

  @IsArray()
  public stacks: string[];
}
