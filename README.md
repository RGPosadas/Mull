# Müll

- [Müll](#m-ll)
  - [Team Members](#team-members)
  - [Development Guidelines](#development-guidelines)
  - [Setting Up your Development Environment](#setting-up-your-development-environment)
    - [Nx and npm](#nx-and-npm)
    - [Enforcing Code Formatting and Standards](#enforcing-code-formatting-and-standards)
    - [Secrets and configuration](#secrets-and-configuration)
  - [Running Linting](#running-linting)
  - [Running Tests](#running-tests)
    - [Unit and UI Snapshot Tests](#unit-and-ui-snapshot-tests)
    - [E2E Tests](#e2e-tests)
  - [Running The Application](#running-the-application)
    - [Serving the application locally for development:](#serving-the-application-locally-for-development-)
    - [Building the application for production:](#building-the-application-for-production-)
    - [Serving the production built stack locally:](#serving-the-production-built-stack-locally-)
  - [Building and Running The Application with Docker](#building-and-running-the-application-with-docker)
    - [Front-end](#front-end)
    - [Back-end](#back-end)
  - [Travis CI](#travis-ci)
    - [Scripts](#scripts)
  - [Troubleshooting](#troubleshooting)
    - [Inconsistent/Failing Travis Builds](#inconsistent-failing-travis-builds)

## Team Members

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

## Development Guidelines

We try our best to adhere to the set of rules and guidelines that we've come up as a team to have an efficient workflow. To view our guidelines, refer to our [GitHub Wiki](https://github.com/RGPosadas/Mull/wiki).

## Setting Up your Development Environment

### Nx and npm

We use npm and Nx to manage our workspace and dependencies. The Nx CLI offers powerful tools for development, and we recommend you install it when contributing to the project.

1. Install npm and nodejs for your operating system.
1. Install the Nx CLI:
   - `npm install -g nx`
1. Install dependencies:
   - `npm i`

### Enforcing Code Formatting and Standards

This project uses pre-commit to enforce formatting and standards. To make sure standards are followed, Travis fails commits which don't comply. This section will detail how to setup pre-commit locally.

1. [Install pre-commit](https://pre-commit.com/#install):
   - `pip install pre-commit`
1. Install the git hooks needed for pre-commit for every commit:
   - `pre-commit install`
1. Run pre-commit on all files:
   - `pre-commit run -a`
1. You're done! pre-commit will now run when you create a commit for our repository!

### Secrets and configuration

Some secrets and sensitive configuration files are needed to properly operate certains parts of the stack.

1. Add an .env file with the required credentials in the root of the project:
   ```
   DB_HOST=<host>
   DB_USERNAME=<username>
   DB_PASSWORD=<password>
   ```
1. Start the server and client dev server in another terminal to test that everything is working correctly.
   - `nx serve mull-api`
   - `nx serve mull`

## Running Linting

Linting is done through the [Nx CLI](https://nx.dev/latest/react/cli/lint), and uses ESLint.

To lint a project:

```bash
nx lint <project>
```

To lint all projects:

```bash
nx run-many --target=lint --all
```

To lint projects affected by your changes:

```bash
nx affected:lint --base=origin/<base-branch>
```

## Running Tests

### Unit and UI Snapshot Tests

Testing is done thought the [Nx CLI](https://nx.dev/latest/react/cli/test), and uses Jest as the main test runner. Unit tests for our ui project(s) also include snapshot tests using [React Test Renderer](https://reactjs.org/docs/test-renderer.html).

To test a project:

```bash
nx test <project>
```

To update the snapshots of a project:

```bash
nx test <project> --updateSnapshot
```

To test all projects:

```bash
nx run-many --target=test --all
```

To test projects affected by your changes:

```bash
nx affected:test --base=origin/<base-branch>
```

### E2E Tests

E2E testing is done thought the [Nx CLI](https://nx.dev/latest/react/cli/e2e), and uses [cypress](https://www.cypress.io/).

To run e2e tests for a project:

```bash
nx e2e <project>
```

To run e2e tests in watch mode:

```bash
nx e2e <project> --watch
```

To run e2e tests in headless mode:

```bash
nx e2e <project> --headless
```

To run e2e tests on projects affected by your changes:

```bash
nx affected:e2e --base=origin/<base-branch>
```

## Running The Application

### Serving the application locally for development:

1. Serve the front-end application:
   - `npm start mull-ui`
2. Serve the back-end application (in a different tab):
   - `npm start mull-api`

### Building the application for production:

- `npm run build-ui && npm run build-api`

### Serving the production built stack locally:

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

## Building and Running The Application with Docker

### Front-end

1. Build
   - `docker build -t mull-ui:dev -f apps/mull-ui/Dockerfile .`
2. Run
   - `docker run -p 8080:80 mull-ui:dev`

### Back-end

1. Build
   - `docker build -t mull-api:dev -f apps/mull-api/Dockerfile .`
2. Run
   - `docker run -p 3333:3333 mull-api:dev`

## Travis CI

### Scripts

Scripts used for running checks on Travis CI can be found under the `scripts/` folder.

- `ci-checks.sh`: This script is meant to be run by Travis CI. It checks the trigger of the current build and run the appropriate checks.
- `check-all.sh`: This script runs lint, test and e2e checks on all projects. To run it:
  1. `bash scripts/check-all.sh`
- `check-affected.sh`: This script runs lint, test and e2e checks on affected projects. To run it:
  1. `export BASE_BRANCH=develop`, or some other base branch
  1. `bash scripts/check-affected.sh`

## Troubleshooting

### Inconsistent/Failing Travis Builds

We are now caching `npm` and `pre-commit` for faster build times. However, it is possible for the cache to be spoiled with bad data, or can simply become invalid/obsolete. This would result in inconsistent, or even failed, Travis builds compared to local builds.

As a fix, try [clearing the Travis cache](https://docs.travis-ci.com/user/caching/#clearing-caches). Once cleared, re-run the builds.
