# Releaser — A release notes generator

My goal is to morph this project into a simple CLI that asks questions and applies the answers to a Release Notes template to make the whole release notes process much less labor intensive. Currently, the scripts retrieve information from Jira and GitHub to generate a release notes markdown file with the following sections:

- Highlights (Depends on entry of release notes for Epics. In progress.)
- Summary table (Jira stories and bugs)
- Documentation updates
- Known Issues
- Upgrading from previous versions
- Update dependencies (which contains the dependencies table)

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

