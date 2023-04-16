#! /usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import chalk from 'chalk';
import clear from "clear";
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

import { Spinner } from 'cli-spinner';
const spinner = new Spinner(`${chalk.yellow('Processing.. %s')}`);
// spinner.setSpinnerString('|/-\\');
// spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');
spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');

clear();
console.log(
  chalk.yellow(textSync("Jit Notes!", { horizontalLayout: "fitted", font: "Standard" }))
);

console.log(chalk.green(`Linking Jira tickets with GitHub PRs to show you
the whole development story. Let's get started!\n`));

const start = async () => {
  try {
    const answers = await askQuestions();
    const { jiraProject, releaseVersion, ticketStatus, startDate, endDate } = answers;
    console.log("");
    spinner.start();

    const jiraReleaseQuery = escape(`project = ${jiraProject} AND issuetype != Task AND status = "${ticketStatus}" ORDER BY issuetype DESC`);
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
    console.log(`${chalk.white('✔ Jit notes created successfully!\n')}`);
    console.log('\x1b[33m%s\x1b[0m', `View the new CHANGELOG.md in your current directory.\n`);

  } catch (e) {
    console.log(`${chalk.red('\nPlease correct the following code-related errors and try again.')}`);
    console.error(`${chalk.red(e)}`);
  } finally {
    console.log(`${chalk.white('✔ Exiting...\n')}`);
    spinner.stop(true);
  }
};

start();
