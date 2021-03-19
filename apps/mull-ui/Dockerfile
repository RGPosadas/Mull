FROM node:14 as build

WORKDIR /mull-ui

COPY ./ ./

RUN npm i --unsafe-perm
RUN npm run build-ui

FROM nginx:stable-alpine

COPY --from=build /mull-ui/dist/apps/mull-ui /usr/share/nginx/html
COPY --from=build /mull-ui/apps/mull-ui/nginx.conf /etc/nginx/conf.d/default.conf

## add permissions to nginx user
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

CMD ["nginx", "-g", "daemon off;"]

## switch to nginx user to run as non-root
USER nginx
