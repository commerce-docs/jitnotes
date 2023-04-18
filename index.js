#! /usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import chalk from 'chalk';
import clear from "clear";
import { escape } from 'querystring';
import askQuestions from './src/questions.js';
import fetchData from './src/fetchData.js';
import extractContent from './src/extractContent.js';

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
spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');

// Clear console and show welcome message
clear();
console.log(chalk.yellow(textSync("Jit Notes!", { horizontalLayout: "fitted", font: "Standard" })));
console.log(chalk.green(`Linking Jira tickets with GitHub PRs to show you
the whole development story. Let's get started!\n`));

const start = async () => {
  try {
    // Ask relevant questions
    const answers = await askQuestions();
    const { jiraProject, githubRepo, releaseVersion, ticketStatus, startDate, endDate, jiraToken, githubToken } = answers;
    console.log("");
    spinner.start();

    // Create Jira and GitHub API URLs
    const jiraReleaseQuery = escape(`project = ${jiraProject} AND issuetype != Task AND status = "${ticketStatus}" ORDER BY issuetype DESC`);
    const jiraUrl = `https://jira.corp.adobe.com/rest/api/2/search?jql=${jiraReleaseQuery}&maxResults=150`;
    const githubUrl = `https://api.github.com/search/issues?q=repo:${githubRepo}+is:pr+is:merged+merged:${startDate}..${endDate}&sort=created&order=asc`;

    // Get Jira and GitHub data
    const jiraData = await fetchData(jiraUrl, process.env.JIRA_TOKEN || jiraToken, 'jira');
    const githubData = await fetchData(githubUrl, process.env.GITHUB_TOKEN || githubToken, 'github');
    const jiraIssues = await extractContent(jiraData, 'jira');
    const githubPRs = await extractContent(githubData, 'github');

    // Pass Jira and GitHub data to create sections for release notes template
    const highlights = getHighlights(jiraIssues, githubPRs);
    const summaryTable = getSummaryTable(jiraIssues, githubPRs);
    const jiraLinks = getJiraLinks(jiraIssues, githubPRs);
    const githubLinks = getGithubLinks(jiraIssues, githubPRs);
    const githubReleasesLink = getGithubReleasesLink(releaseVersion);

    // Replace placeholders in template
    setupPlaceholders(answers, highlights, summaryTable, jiraLinks, githubLinks, githubReleasesLink);
    copyTemplate(jiraProject);
    replaceTemplatePlaceholders(answers);

    // Push feedback to console
    console.log(`${chalk.white('✔ Jit notes created successfully!\n')}`);
    console.log('\x1b[33m%s\x1b[0m', `View the new CHANGELOG.md in your current directory.\n`);

  } catch (error) {
    console.log(`${chalk.red('\nPlease correct the following code-related errors and try again.')}`);
    console.error(`${chalk.red(error)}`);
  } finally {
    console.log(`${chalk.white('✔ Exiting...\n')}`);
    spinner.stop(true);
  }
};

start();
