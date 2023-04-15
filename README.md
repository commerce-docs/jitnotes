# JitNotes — A release notes generator

This CLI fetches Jira tickets and finds the corresponding GitHub PRs to generate a release notes markdown file.
The CLI asks you a series of questions that it uses to generate the release notes. The questions are:

1. **Jira name** for project (PWA, USF, COMDOX).
2. **Release version** number (Major.Minor.Patch).
3. **Previous version** number (Major.Minor.Patch).
4. **Type** of ticket to include (Story, Bug, etc.)
5. **Status** of tickets to include (Open, In Progress, Done, etc.)
6. **Start date** for including ticket statuses set on and after the date.
7. **End date** for including ticket statues set on and before the date.

The release notes template provides the following sections:

- Highlights (Depends on entry of release notes for Epics. In progress.)
- Summary table (Jira stories and bugs)
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

This will generate a new CHANGELOG.md file in the project's root.
