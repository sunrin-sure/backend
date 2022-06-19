import {
  IsArray, IsEmail, IsEnum, IsOptional, IsString, IsUrl, Matches,
} from 'class-validator';
import { JobTypes, JobNames } from '@/types/users/user.job.type';

export class UserDto {
  @IsString()
  @Matches(
    /^[a-zA-Zㄱ-ㅎ가-힣0-9]([._-](?![._-])|[a-zA-Zㄱ-ㅎ가-힣0-9]){1,10}[a-zA-Zㄱ-ㅎ가-힣0-9]$/,
    { message: 'username must match regular expression' },
  )
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  @Matches(
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    { message: 'password must match regular expression' },
  )
  public password: string;

  @IsUrl()
  @IsOptional()
  public avatar: string;

  @IsEnum(JobTypes, {
    each: true,
    message: 'the job you entered does not exist in the database',
  })
  public fields: JobNames[];

  @IsArray()
  public stacks: string[];
}
