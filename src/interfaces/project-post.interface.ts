import { JobNames } from '../types/users/user.job.type';

export interface ProjectPost {
  title: string;
  author: string;
  contents: string;
  type: string;
  banner: string;
  recruitment_limit: number;
  desired_fields: JobNames[];
  desired_stacks: string[];
}
