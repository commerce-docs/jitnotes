/*
Copyright © Adobe, Inc. All rights reserved.
See COPYING.txt for license details.
*/

import { toMarkdown } from 'mdast-util-to-markdown'
import { gfmTableToMarkdown } from 'mdast-util-gfm-table'

import {
  list,
  listItem,
  paragraph,
  root,
  table,
  tableCell,
  tableRow,
  text
} from "mdast-builder";

import { unified } from "unified";
import stringify from "remark-stringify";

function createGitHubPrLinks(prNumber) {
  const ghLinkReferences = [];
  const githubLinkReference = createGitHubLinkReference(prNumber);

  if (githubLinkReference.identifier.toString().includes(',')) {
    const linkReferences = githubLinkReference.identifier.toString().split(',');
    linkReferences.forEach(prNum => {
      ghLinkReferences.push({
        type: 'linkReference',
        identifier: prNum,
        label: prNum,
        referenceType: 'collapsed',
        children: [text(prNum)]
      }, text(', '));
    });
  } else {
    ghLinkReferences.push(githubLinkReference);
  }
  return ghLinkReferences;
}

const createLinkToGitHubReleases = () => {
  return {
    type: 'definition',
    identifier: 'pwa studio releases',
    label: 'PWA Studio releases',
    url: 'https://github.com/magento/pwa-studio/releases',
    title: null,
  }
}

// Jira ticket reference links for the summary table
const createJiraLinkReference = ticketNumber => {
  return ({
    type: 'linkReference',
    identifier: ticketNumber,
    label: ticketNumber,
    referenceType: 'collapsed',
    children: [text(ticketNumber)]
  });
};

// GitHub PR reference links for the summary table
function createGitHubLinkReference(prNumber) {
  return {
    type: 'linkReference',
    identifier: prNumber,
    label: prNumber,
    referenceType: 'collapsed',
    children: [text(prNumber)]
  };
}

const createJiraLinkDefinitions = jiraIssues => {
  const jiraLinkDefinitions = [];

  const createJiraLinkDefinition = (jiraIssue) => {
    if (!jiraIssue)
      return text('');

    return {
      type: 'definition',
      identifier: jiraIssue.key,
      label: jiraIssue.key,
      url: `https://jira.corp.adobe.com/browse/${jiraIssue.key}`,
      title: null,
    };
  };

  jiraIssues.map(jiraIssue => {
    const linkDefinition = createJiraLinkDefinition(jiraIssue);
    jiraLinkDefinitions.push(linkDefinition);
    jiraLinkDefinitions.push(text('\n'));
  })
  return root({ type: 'paragraph', children: jiraLinkDefinitions })
};

const createGithubLinkDefinitions = jiraIssues => {
  const githubLinkDefinitions = [];

  const createGithubLinkDefinition = (jiraIssue) => {
    if (!jiraIssue.prNumber)
      return text('');
    // If the jiraIssue has more than one associated PR, create a link for each PR
    if (jiraIssue.prNumber.toString().includes(',')) {
      const prNumbers = jiraIssue.prNumber.toString().split(',');
      return prNumbers.map(prNumber => ({
        type: 'definition',
        identifier: prNumber,
        label: prNumber,
        url: jiraIssue.prLink.split(',')[prNumbers.indexOf(prNumber)],
        title: null,
      }));
    }
    return {
      type: 'definition',
      identifier: jiraIssue.prNumber,
      label: jiraIssue.prNumber,
      url: jiraIssue.prLink,
      title: null,
    };
  }

  jiraIssues.map(jiraIssue => {
    const linkDefinitions = createGithubLinkDefinition(jiraIssue);
    if (linkDefinitions.type === undefined) {
      linkDefinitions.forEach(linkDefinition => {
        githubLinkDefinitions.push(linkDefinition);
        githubLinkDefinitions.push(text('\n'));
      })
    } else {
      githubLinkDefinitions.push(linkDefinitions);
      githubLinkDefinitions.push(text('\n'));
    }
  })

  return root({ type: 'paragraph', children: githubLinkDefinitions })
};

const createSummaryTable = jiraIssues => {

  const tableHeader = tableRow([
    tableCell([text('Type')]),
    tableCell([text('Description')]),
    tableCell([text('GitHub PR(s)')]),
    tableCell([text('Jira Issue')]),
  ]);

  const createTableRow = ({ issuetype, key, prNumber, title }) => {
    const ghLinkReferences = createGitHubPrLinks(prNumber);
    const jiraLinkReference = createJiraLinkReference(key);
    return tableRow([
      tableCell([text(issuetype)]),
      tableCell([text(title || '')]),
      tableCell(ghLinkReferences),
      tableCell(jiraLinkReference),
    ]);
  };
  const summaryTableRows = jiraIssues.map(jiraIssue => createTableRow(jiraIssue))
  const summaryTableNode = table(['left', 'left', 'left'], [tableHeader, ...summaryTableRows]);

  return root(summaryTableNode);
};

const createHighlights = (jiraIssues, githubPRs) => {
  const highlights = [];

  jiraIssues.map(({ releaseNotes, issuetype, key, prNumber }) => {
    const prNumberLinks = createGitHubPrLinks(prNumber);
    if (releaseNotes) {
      highlights.push(list('unordered', [
        listItem([
          paragraph([
            text(releaseNotes),
            text(' (GitHub PR: '),
            createGitHubLinkReference(prNumber),
            text(')'),
          ])
        ])
      ]));
      highlights.push(text('\n'));
    } else {
      highlights.push(list('unordered', [
        listItem([
          paragraph([
            text('ADD MISSING RELEASE NOTE ENTRY HERE --> '),
            createJiraLinkReference(key)
          ])
        ])]));
      highlights.push(text('\n'));
    }
  })
  return root({ type: 'paragraph', children: highlights })
};

export function getHighlights(jiraIssues, githubPRs) {
  const processor = unified().use(stringify, {});
  const highlights = processor.stringify(createHighlights(jiraIssues, githubPRs));
  return highlights;
}

export function getSummaryTable(jiraIssues, githubPRs) {
  const summaryTable = toMarkdown(createSummaryTable(jiraIssues, githubPRs), { extensions: [gfmTableToMarkdown()] });
  return summaryTable;
}

export function getJiraLinks(jiraIssues, githubPRs) {
  const processor = unified().use(stringify, {});
  const jiraLinks = processor.stringify(createJiraLinkDefinitions(jiraIssues, githubPRs));
  return jiraLinks;
}

export function getGithubLinks(jiraIssues, githubPRs) {
  const processor = unified().use(stringify, {});
  const githubLinks = processor.stringify(createGithubLinkDefinitions(jiraIssues, githubPRs));
  return githubLinks;
}

export function getGithubReleasesLink(jiraIssues, githubPRs) {
  const processor = unified().use(stringify, {});
  const githubReleasesLink = processor.stringify(createLinkToGitHubReleases(jiraIssues, githubPRs));
  return githubReleasesLink;
}
