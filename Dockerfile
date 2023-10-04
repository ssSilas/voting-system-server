FROM node:alpine

RUN apk add --no-cache bash

RUN yarn add -g @nestjs/cli

USER node

WORKDIR /home/node/app
