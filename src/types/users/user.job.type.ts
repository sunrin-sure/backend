type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>;

export type JobNames = 'frontend'  |
                       'backend'   |
                       'fullstack' |
                       'desgin'    |
                       'planner'   ;
                       
export const JobTypes: ReadonlyRecord<JobNames, JobNames> = {
  frontend  : 'frontend',
  backend   : 'backend',
  fullstack : 'fullstack',
  desgin    : 'desgin',
  planner   : 'planner',
};