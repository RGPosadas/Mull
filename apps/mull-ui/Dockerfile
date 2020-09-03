FROM node:12 as build

WORKDIR /mull-ui

COPY ./ ./

RUN npm i
RUN npm run build-ui

FROM nginx:stable-alpine

COPY --from=build /mull-ui/dist/apps/mull-ui /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
