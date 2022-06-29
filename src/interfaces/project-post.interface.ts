import { JobNames } from '../types/users/user.job.type';

export interface ProjectPost {
  title: string;
  author: string;
  contents: string;
  type: string;
  thumbnail: string;
  recruitment_limit: number;
  desired_fields: JobNames[];
  desired_stacks: string[];
  is_open: boolean;
}
