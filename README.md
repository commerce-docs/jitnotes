# Releaser — A release notes generator

These scripts will morph into a simple CLI for generating release notes using content from Jira and GitHub as the source. Currently, the scripts generate a release notes markdown file with the following sections:

- Highlights
- Summary table (Jira stories and bugs)
- Documentation updates
- Known Issues
- Upgrading from previous versions
- Update dependencies (which contains the dependencies table)

This project will soon become a CLI to make it super easy to create release notes files for any Jira project.

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
