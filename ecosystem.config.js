/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */

module.exports = {
  apps: [
    {
      name: 'prod',
      script: 'dist/server.js',
      exec_mode: 'cluster',
      instance_var: 'INSTANCE_ID',
      instances: 2,
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      max_memory_restart: '1G',
      merge_logs: true,
      output: './logs/access.log',
      error: './logs/error.log',
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
    {
      name: 'dev',
      script: 'ts-node',
      args: '-r tsconfig-paths/register --transpile-only src/server.ts',
      exec_mode: 'cluster',
      instance_var: 'INSTANCE_ID',
      instances: 2,
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      max_memory_restart: '1G',
      merge_logs: true,
      output: './logs/access.log',
      error: './logs/error.log',
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
    },
  ],
deploy: {
    production: {
      user: 'user',
      host: '0.0.0.0',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: 'dist/server.js',
      'post-deploy': 'yarn install && yarn build && yarn pm2 reload ecosystem.config.js --only prod',
    },
  },
};