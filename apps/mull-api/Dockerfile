FROM node:12 as build

WORKDIR /usr/src/app

COPY ./ ./

RUN npm i
RUN npm run build-api

WORKDIR /usr/src/app/dist/apps/mull-api

CMD ["node", "main.js"]
