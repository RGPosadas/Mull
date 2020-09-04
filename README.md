# Müll

- [Team Members](#team-members)
- [Development Guidelines](#development-guidelines)
- [Setting up a development environment](#setting-up-a-development-environment)
- [Running the application](#running-the-application)
  - [Serving the application locally for development:](#serving-the-application-locally-for-development)
  - [Building the application for production:](#building-the-application-for-production)
  - [Serving the production built stack locally:](#serving-the-production-built-stack-locally)
- [Building and running the application with Docker](#building-and-running-the-application-with-docker)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
- [Troubleshooting](#troubleshooting)
  - [Inonsistent/Failing Travis Builds](#inonsistentfailing-travis-builds)

# Team Members

Müll is brought to you by members of `Team Bug bytes`.

- Ritchelle Grace Posadas, @RGPosadas (Team Lead)
- Cristian Aldea, @TheGreatMarkus
- Jonathan Hsu, @bit172
- Jimmy Lau, @JimLau49
- Cindy Lo, @cindyslittleplanet
- Omar Sahtout, @osahtout
- Yun Shi Lin, @ys-lin
- Leo Jr. Silao, @leojrsilao
- Ragith Sabapathipillai, @r-saba

# Development Guidelines

- We try our best to adhere to the set of rules and guidelines that we've come up as a team in order to have an efficient workflow.
- To view, refer to our [GitHub Wiki](https://github.com/RGPosadas/Mull/wiki).

# Setting up a development environment

1. Install the Nx CLI:
   - `npm install -g nx`
2. Install dependencies
   - `npm i`
3. Install pre-commit: https://pre-commit.com/
   - `pip install pre-commit`
   - `pre-commit install` (Run in the root dir. of the project)

# Running the application

## Serving the application locally for development:

1. Serve the front-end application:
   - `npm start mull-ui`
2. Serve the back-end application (in a different tab):
   - `npm start mull-api`

## Building the application for production:

- `npm run build-ui && npm run build-api`

## Serving the production built stack locally:

1. Serve the production frontend:
   1. Install `http-server` (or some other web server)
      - `npm i -g http-server`
   2. (Optional) Generate local SSL certificates for HTTPS
      - `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`
   3. Run a server locally:
      - `http-server dist/apps/mull-ui -p 8080 -c-1`
      - Add the `-S` option if using HTTPS
2. Serve the production backend:
   - `node dist/apps/mull-api/main.js`

# Building and running the application with Docker

## Front-end

1. Build
   - `docker build -t mull-ui:dev -f apps/mull-ui/Dockerfile .`
2. Run
   - `docker run -p 8080:80 mull-ui:dev`

## Back-end

1. Build
   - `docker build -t mull-api:dev -f apps/mull-api/Dockerfile .`
2. Run
   - `docker run -p 3333:3333 mull-api:dev`

# Troubleshooting

## Inonsistent/Failing Travis Builds

We are now caching `npm` and `pre-commit` for faster build times. However, it is possible for the cache to be spoiled with bad data, or can simply become invalid/obsolete. This would result in inconsistent, or even failed, Travis builds compared to local builds.

As a fix, try [clearing the Travis cache](https://docs.travis-ci.com/user/caching/#clearing-caches). Once cleared, re-run the builds.
