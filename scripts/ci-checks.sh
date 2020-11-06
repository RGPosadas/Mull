if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    if [ "$TRAVIS_BRANCH" == "master" ]; then
        # Run all checks on everything
        npm run all-projects -- --target=lint
        npm run all-projects -- --target=test --codeCoverage
        npm run start -- mull-api &
        npm run all-projects -- --target=e2e --headless
    else
        if [ "$TRAVIS_BRANCH" == "develop" ]; then
            export BASE_BRANCH="master"
        else
            export BASE_BRANCH="develop"
        fi
        npm run affected:lint -- --base=origin/$BASE_BRANCH
        npm run affected:test -- --base=origin/$BASE_BRANCH --codeCoverage
        npm run start -- mull-api &
        npm run affected:e2e -- --base=origin/$BASE_BRANCH
    fi
else
    echo "Checks won't run on pull request builds"
fi
