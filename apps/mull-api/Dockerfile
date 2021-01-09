FROM node:12 as build

WORKDIR /usr/src/app

COPY ./ ./

RUN npm i
RUN npm run build-api

CMD ["node", "/usr/src/app/dist/apps/mull-api/main.js"]
