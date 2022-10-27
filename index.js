/*
Copyright ©Adobe, Inc. All rights reserved.
See COPYING.txt for license details.
*/

require(`dotenv`).config();

// const clear = require('clear');
// const chalk = require('chalk');
// const { textSync } = require('figlet');
// const questions = require('./lib/questions');
// const files = require('./lib/files');
// const placeholders = require('./lib/placeholders');

const fs = require('fs');
const { escape } = require("querystring");

const createReleaseNotes = require('./src/createReleaseNotes');
const fetchJiraData = require('./src/fetchJiraData');
const fetchGitHubData = require('./src/fetchGitHubData');
const createGitHubPrObjects = require('./src/createGitHubPrObjects');
const createJiraIssueObjects = require('./src/createJiraIssueObjects');

const JiraReleaseQuery = "project = PWA AND issuetype != Task AND status = 'Deployment Queue' ORDER BY issuetype DESC";
const encodedURL = escape(JiraReleaseQuery);

const start = async (jiraAPI) => {
    const jiraData = await fetchJiraData(jiraAPI);
    const githubData = await fetchGitHubData('magento/pwa-studio', '2022-08-09', '2022-10-15');
    const jiraIssues = await createJiraIssueObjects(jiraData);
    const githubPRs = await createGitHubPrObjects(githubData);
    const releaseNotes = createReleaseNotes(jiraIssues, githubPRs);

    try {
        fs.writeFileSync('./CHANGELOG.md', releaseNotes);
    } catch (err) {
        console.error(err);
    }
    console.log(releaseNotes);

};

start(`https://jira.corp.adobe.com/rest/api/2/search?jql=${encodedURL}&maxResults=150`);
