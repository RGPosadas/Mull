# This script runs lint, test and e2e checks on affected projects.
# Make sure $BASE_BRANCH is set before running this script.

if [ -n "$BASE_BRANCH" ]; then
    npm run affected:lint -- --base=origin/$BASE_BRANCH
    npm run affected:test -- --base=origin/$BASE_BRANCH --codeCoverage

    npm start mull-api &
    npm run wait-on http://localhost:3333/api

    npm run affected:e2e -- --base=origin/$BASE_BRANCH

    npx kill-port 3333

else
    echo "Please set the \$BASE_BRANCH variable before running this script. Example:\n\n\texport BASE_BRANCH=develop"
fi
