import { ProjectPost } from '../interfaces/project-post.interface';
import { model, Schema, Document } from 'mongoose';
import { JobTypes } from '../types/users/user.job.type';

const projectPostSchema: Schema = new Schema(
  {
    // 게시글 제목
    title: {
      type: String,
      required: true,
    },
    // 작성자
    author: {
      type: String,
      required: true,
    },
    // 내용
    contents: {
      type: String,
      required: true,
    },
    // 유형 - 프로젝트, 공모전, 포트폴리오
    type: {
      type: String,
      required: true,
    },
    // 배너 이미지
    banner: {
      type: String,
      required: true,
    },
    // 모집 인원
    recruitment_limit: {
      type: Number,
      required: true,
    },
    // 원하는 분야
    desired_fields: {
      type: [String],
      enum: JobTypes,
      required: false,
    },
    // 원하는 언어, 기술
    desired_stacks: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true, versionKey: false },
);

const projectPostModel = model<ProjectPost & Document>(
  'ProjectPost',
  projectPostSchema,
);

export default projectPostModel;
