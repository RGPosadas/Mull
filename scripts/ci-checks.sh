# This script is meant to be run by travis ci.

# If you want to run it locally, make sure $TRAVIS_PULL_REQUEST and $TRAVIS_BRANCH are set
# Also, make sure you run it from the project root. Example:
# bash ./scripts/ci-checks.sh

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    if [ "$TRAVIS_BRANCH" == "master" ]; then
        # Run all checks on everything
        ./scripts/check-all.sh
    else
        if [ "$TRAVIS_BRANCH" == "develop" ]; then
            export BASE_BRANCH="master"
        else
            export BASE_BRANCH="develop"
        fi
        ./scripts/check-affected.sh
    fi
else
    echo "Checks won't run on pull request builds"
fi
