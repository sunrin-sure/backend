import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { JobTypes, JobNames } from '../types/users/user.job.type';

export class ProjectPostDto {
  @IsString()
  @MaxLength(20, { message: 'title is too long' })
  public title: string;

  @IsOptional()
  @IsString()
  public author: string;

  @IsString()
  public contents: string;

  @IsString()
  public type: string;

  @IsOptional()
  @IsUrl()
  public thumbnail: string;

  @IsInt()
  public recruitment_limit: number;

  @IsEnum(JobTypes, {
    each: true,
    message: 'the job you entered does not exist in the database',
  })
  public desired_fields: JobNames[];

  @IsOptional()
  @IsArray()
  public desired_stacks: string[];

  @IsBoolean()
  public is_open: boolean;
}
