#!/usr/bin/env bash

#------------------------------ ENV --------------------------------#

# Git branch to build
BRANCH="val"
# Path to source files
SRC_DIR="/home/uhtslims/src/uhts-web"
# Where we want to deploy it - configured to be served by Apache
WWW_DIR="/home/uhtslims/www/htdocs"
# Config file for this environment
CONF="/home/uhtslims/www/conf/conf.js"

#----------------------------- SOURCE ------------------------------#

# Start inside the source directory - cloned from Bitbucket
cd ${SRC_DIR}

# Update the source
git checkout ${BRANCH} 2>/dev/null || git checkout -b ${BRANCH}
git pull origin val

#----------------------------- BUILD -------------------------------#

isnode() {
    if hash node 2>/dev/null; then
        echo "Node found at "$(which node)
    else
        echo "Node not found, try with nvm"
        nvm install v7.7.3
        nvm use --delete-prefix v7.7.3
    fi
}

# Set up node and npm
isnode
echo "Node path: "$(which node)
echo "Node version: "$(node -v)
echo "NPM version: "$(npm -v)

# Resolve dependencies
npm install

# Build the bundle
node run build --debug

#----------------------------- DEPLOY ------------------------------#

rm -rf ${WWW_DIR}/*
cp -r public/* ${WWW_DIR}/
cd ${WWW_DIR} && cp ../conf/conf.js ./conf/conf.js

