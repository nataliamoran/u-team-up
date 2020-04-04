#!/bin/sh
DEPLOYMENT_DATE=`date`
BASE_DIR=`pwd`
BACKEND_DIR="$BASE_DIR/backend"
DEPLOYMENT_DIR="$BASE_DIR/deployment"
FRONTEND_DIR="$BASE_DIR/u_team_up_app"


echo "===> Removing previous deployment if exists"
rm -rf $DEPLOYMENT_DIR
echo "===> Creating deployment dir and connecting to heroku git"
mkdir $DEPLOYMENT_DIR
cd $DEPLOYMENT_DIR
git init
heroku git:remote -a radiant-reef-20457
git pull heroku master
/bin/rm -rf *

echo "===> Building frontend app in production mode"
cd $FRONTEND_DIR
npm run-script build

echo "===> Copying backend to deployment dir"
cp -R $BACKEND_DIR/* $DEPLOYMENT_DIR
echo "===> Moving frontend build result to deployment dir"
mv $FRONTEND_DIR/build $DEPLOYMENT_DIR/public

echo "===> Deploying to heroku"
cd $DEPLOYMENT_DIR
rm -rf $DEPLOYMENT_DIR/package-lock.json
git add .
git commit -m "Deployment on $DEPLOYMENT_DATE"
git push heroku master

echo "===> Cleaning up"
rm -rf $DEPLOYMENT_DIR

