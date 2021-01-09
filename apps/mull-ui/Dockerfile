FROM node:12 as build

WORKDIR /mull-ui

COPY ./ ./

RUN npm i
RUN npm run build-ui

FROM nginx:stable-alpine

COPY --from=build /mull-ui/dist/apps/mull-ui /usr/share/nginx/html
COPY --from=build /mull-ui/apps/mull-ui/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
