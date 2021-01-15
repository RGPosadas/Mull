FROM node:12 as build

WORKDIR /usr/src/app

COPY ./ ./

RUN npm i
RUN npm run build-api

# create unprivileged user
RUN useradd -u 1001 mull-backend
# add dir permissions to mull-backend user
RUN chown -R mull-backend /usr/src/app
RUN chmod 755 /usr/src/app

CMD ["node", "/usr/src/app/dist/apps/mull-api/main.js"]

# switch to mull-backend user to run as non-root
USER mull-backend
