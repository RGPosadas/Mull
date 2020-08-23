# LitterRally

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
   - `npm start rally-ui`
2. Serve the back-end application (in a different tab):
   - `npm start rally-api`

## Building the application for production:

- `npm run build-ui && npm run build-api`

## Serving the production built stack locally:

1. Serve the production frontend:
   1. Install `http-server` (or some other web server)
      - `npm i -g http-server`
   2. (Optional) Generate local SSL certificates for HTTPS
      - `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`
   3. Run a server locally:
      - `http-server dist/apps/rally-ui -p 8080 -c-1`
      - Add the `-S` option if using HTTPS
2. Serve the production backend:
   - `node dist/apps/rally-api/main.js`

# Building and running the application with Docker

## Front-end

1. Build
   - `docker build -t rally-ui:dev -f apps/rally-ui/Dockerfile .`
2. Run
   - `docker run -p 8080:80 rally-ui:dev`

## Back-end

1. Build
   - `docker build -t rally-api:dev -f apps/rally-api/Dockerfile .`
2. Run
   - `docker run -p 3333:3333 rally-api:dev`
