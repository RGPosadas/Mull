# This script runs lint, test and e2e checks on all projects.

npm run all-projects -- --target=lint
npm run all-projects -- --target=test --codeCoverage

npm start mull-api &
npm run wait-on http://localhost:3333/api

npm run all-projects -- --target=e2e --headless

npx kill-port 3333
