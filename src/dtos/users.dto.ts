import { JobTypes } from '@types/users/user.job.type';
import {
  IsArray, IsEmail, IsEnum, IsString, Matches,
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

  @IsEnum(JobTypes, { 
    each: true,
    message: "the job you entered does not exist in the database" })
  public fields: JobTypes[];

  @IsArray()
  public stacks: string[];
}
