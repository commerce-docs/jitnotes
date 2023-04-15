#! /usr/bin/env node

/*
Copyright © Adobe, Inc. All rights reserved.
See COPYING.txt for license details.
*/

export function setupPlaceholders(answers, highlights, summaryTable, jiraLinks, githubLinks, githubReleasesLink) {
    answers.HIGHLIGHTS = highlights;
    answers.SUMMARY_TABLE = summaryTable;
    answers.JIRA_LINKS = jiraLinks;
    answers.GITHUB_LINKS = githubLinks;
    answers.GITHUB_RELEASES_LINK = githubReleasesLink;
}
