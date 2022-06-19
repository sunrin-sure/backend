type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>;

export type JobNames = 'frontend' |
                       'backend' |
                       'fullstack' |
                       'design' |
                       'planner';

export const JobTypes: ReadonlyRecord<JobNames, JobNames> = {
  frontend: 'frontend',
  backend: 'backend',
  fullstack: 'fullstack',
  design: 'design',
  planner: 'planner',
};
