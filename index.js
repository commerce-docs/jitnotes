#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import chalk from 'chalk';
import clear from "clear";
import { writeFileSync } from 'fs';
import { escape } from 'querystring';
import askQuestions from './src/questions.js';
import fetchJiraData from './src/fetchJiraData.js';
import fetchGitHubData from './src/fetchGitHubData.js';
import createJiraIssueObjects from './src/createJiraIssueObjects.js';
import createGitHubPrObjects from './src/createGitHubPrObjects.js';
import createReleaseNotes from './src/createReleaseNotes.js';
import figletPkg from 'figlet';
const { textSync } = figletPkg;

clear();
console.log(
  chalk.yellowBright(textSync("PWA Releaser", { horizontalLayout: "fitted", font: "Standard" }))
);

console.log('\x1b[33m%s\x1b[0m',
  `This CLI generates markdown text from the RELEASE NOTE field in Jira Story and Bug tickets.
It also generates the corresponding GitHub PRs for each Story and Bug included in the release.
The generated markdown is meant to be copied and pasted into the existing CHANGELOG.md file,
to replace the highlights and tickets for the current release.

The CLI retrieves Jira tickets based on the following JQL query criteria:

1. Only Story and Bug tickets are returned. Task tickets are not included.
2. Only Deployment Queue tickets are returned. Tickets with a "Done" status are not included.
3. Only tickets between the start and end dates are returned.\n`
);

const jiraReleaseQuery = escape('project = PWA AND issuetype != Task AND status = "Deployment Queue" ORDER BY issuetype DESC');
const jiraAPI = `https://jira.corp.adobe.com/rest/api/2/search?jql=${jiraReleaseQuery}&maxResults=150`;

const start = async (jiraAPI) => {
  const answers = await askQuestions();
  const { startDate, endDate } = answers;

  const jiraData = await fetchJiraData(jiraAPI);
  const githubData = await fetchGitHubData('magento/pwa-studio', startDate, endDate);
  const jiraIssues = await createJiraIssueObjects(jiraData);
  const githubPRs = await createGitHubPrObjects(githubData);
  const releaseNotes = createReleaseNotes(jiraIssues, githubPRs);

  try {
    writeFileSync('./CHANGELOG.md', releaseNotes);
  } catch (err) {
    console.error(err);
  }

  console.log('\n');
  console.log('\x1b[33m%s\x1b[0m', `Release notes links created successfully!`);
  console.log('\x1b[33m%s\x1b[0m', `View the CHANGELOG.md created in the root directory of this project.`);
  console.log('\x1b[33m%s\x1b[0m', 'Output is also provided below:');
  console.log('\n');
  console.log(releaseNotes);
};

start(jiraAPI);
