# ReleaseNotes Generator

A tool for drafting release notes by merging Jira and GitHub information into a markdown format ready for informing and description editing of release note stories and bugs. This project will soon become a CLI to make it super easy to create a first draft of release notes for an Adobe project tracked internally using Jira.

## Current Usage

1. Clone this repo to your local machine.
2. Open the project in VS Code.
3. Run `yarn install`.
4. Create a `.env` file with your Jira and GitHub authentication tokens. You can create these tokens yourself, but for Jira access, you need to contact our Jira administrators.
    ```env
    JIRA_AUTH='[base64 Jira token]'
    GITHUB_API_TOKEN='[personal access token]'
    ```
5. Run `yarn start`.

This will generate a new CHANGELOG.md file in the project's root as well as print the output in the console.
