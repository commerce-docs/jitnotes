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

import { getHighlights } from './src/createReleaseNotes.js';
import { getSummaryTable } from './src/createReleaseNotes.js';
import { getJiraLinks } from './src/createReleaseNotes.js';
import { getGithubLinks } from './src/createReleaseNotes.js';
import { getGithubReleasesLink } from './src/createReleaseNotes.js';

import figletPkg from 'figlet';
const { textSync } = figletPkg;
import { copyTemplate } from './src/templates.js';
import { replaceTemplatePlaceholders } from './src/templates.js';
import { setupPlaceholders } from './src/placeholders.js';

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

const start = async () => {
  try {
    const answers = await askQuestions();
    const { jiraProject, releaseVersion, ticketStatus, startDate, endDate } = answers;

    const jiraReleaseQuery = escape(`project = ${jiraProject} AND issuetype in (Story, Bug) AND status = "${ticketStatus}" ORDER BY issuetype DESC`);
    const jiraAPI = `https://jira.corp.adobe.com/rest/api/2/search?jql=${jiraReleaseQuery}&maxResults=150`;

    // Get Jira and GitHub data
    const jiraData = await fetchJiraData(jiraAPI);
    const githubData = await fetchGitHubData('magento/pwa-studio', startDate, endDate);
    const jiraIssues = await createJiraIssueObjects(jiraData);
    const githubPRs = await createGitHubPrObjects(githubData);

    // Pass Jira and GitHub data to create sections for release notes template
    const highlights = getHighlights(jiraIssues, githubPRs);
    const summaryTable = getSummaryTable(jiraIssues, githubPRs);
    const jiraLinks = getJiraLinks(jiraIssues, githubPRs);
    const githubLinks = getGithubLinks(jiraIssues, githubPRs);
    const githubReleasesLink = getGithubReleasesLink(releaseVersion);

    // Create and replace placeholders in template
    setupPlaceholders(answers, highlights, summaryTable, jiraLinks, githubLinks, githubReleasesLink);
    copyTemplate(jiraProject);
    replaceTemplatePlaceholders(answers);

    // Push feedback to console
    console.log(`${chalk.white('✔ Release notes created successfully!')}`);
    console.log('\x1b[33m%s\x1b[0m', `View the CHANGELOG.md created in the root directory of this project.`);
    console.log('\x1b[33m%s\x1b[0m', 'Output is also provided below:');

  } catch (e) {
    console.log(`${chalk.red('Please correct the following errors noted above and try again.')}`);
    console.error(`${chalk.red(e)}`);
  } finally {
    console.log(`${chalk.white('✔ End Release Notes CLI')}`);
  }
};

start();
