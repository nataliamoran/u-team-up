#!/bin/sh
BASE_DIR=`pwd`
BACKEND_DIR="$BASE_DIR/backend"
FRONTEND_DIR="$BASE_DIR/u_team_up_app"
cd $FRONTEND_DIR
npm run-script build
cd $BACKEND_DIR
rm -rf public
mv $FRONTEND_DIR/build $BACKEND_DIR/public

