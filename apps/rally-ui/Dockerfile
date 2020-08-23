FROM node:12 as build

WORKDIR /rally-ui

COPY ./ ./

RUN npm i
RUN npm run build-ui

FROM nginx:stable-alpine

COPY --from=build /rally-ui/dist/apps/rally-ui /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
