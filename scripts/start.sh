#!/usr/bin/env bash

PROJECT_ROOT="/root/app"

DEPLOY_LOG="$PROJECT_ROOT/deploy.log"

TIME_NOW=$(date +%c)

pm2 deploy:$ENV

CURRENT_PID=$(pm2 pid $ENV)
echo "$TIME_NOW > 실행된 프로세스 아이디 $CURRENT_PID 입니다." >> $DEPLOY_LOG