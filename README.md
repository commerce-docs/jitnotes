# JitNotes — A release notes generator

This CLI retrieves key content from Jira tickets, finds all the corresponding GitHub PRs, and generates release notes from a markdown template.

The CLI generates release notes from your answers to the following questions:

1. **Jira name** for project (PWA, USF, COMDOX).
2. **Release version** number (Major.Minor.Patch).
3. **Previous version** number (Major.Minor.Patch).
4. **Type** of ticket to include (Story, Bug, etc.)
5. **Status** of tickets to include (Open, In Progress, Done, etc.)
6. **Start date** for including GitHub PRs merged on and after the date.
7. **End date** for including GitHub PRs merged on and before the date.

## Release notes template

Currently, the release notes template is specific to the PWA Studio project. 
Our plan is to add different project templates later to meet the needs and wants of different teams. 
Sections of the PWA Studio template include:

- **Highlights** — Requires manual content updates based on the code and documentation changes.
- **Code changes** — Autogenerated content from Jira tickets and related GitHub PRs.
- **Documentation changes** — Autogenerated content from Jira tickets and related GitHub PRs.
- **Known issues** — Requires manual content updates.
- **Lighthouse scores** — Requires manual content updates of the scores and SVG graphics.
- **Upgrading from previous versions** — Static content. No changes required.
- **Updated package dependencies** — Requires manual content updates.

**NOTE**: The CLI autogenerates all Jira ticket and GitHub PR links at the bottom of the template.

## Prerequisites

The CLI requires Jira and GitHub access tokens. Follow the links below to request or create the tokens.

- Jira API Access Token (see [JIRA API Account Access](https://wiki.corp.adobe.com/display/JIRA/API+Account+Access)).
- GitHub Personal Access Token (see [Creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)).

After you get the tokens, you can either enter them in the CLI prompts or create an `.env` file in the directory where you run the CLI, using the following keys:

```bash
JIRA_TOKEN='your-jira-token'
GITHUB_TOKEN='your-github-token'
```
## Usage

1. Open a terminal shell in your project directory.
2. Run `npx jitnotes` and follow the CLI prompts.

The CLI creates a file called CHANGELOG.md in the directory where you run the command.

## Future features (contributions welcome!)

Please open a PR if you would like to help. I'd love to hear from you!

- [ ] Add support for different projects.
- [ ] Add support for different release notes templates.
- [ ] Add support for different ticket types (include Tasks and others).
- [ ] Add support for more than one ticket status (In Progress, In Review, Done, etc).
- [ ] Add support for auto-generating Highlights from the release Epics (or by some other means).
- [ ] Add support for auto-generating Known Issues.
- [ ] Add support for auto-generating Lighthouse scores.
- [ ] Add support for auto-generating package dependency table.

If you have any questions or suggestions, please [open an issue](https://github.com/AdobeDocs/jitnotes/issues).
