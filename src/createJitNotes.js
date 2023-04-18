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

function createPrLinks(prNumber) {
  const prLinks = [];
  const prLinkRef = createPrLinkRef(prNumber);

  if (prLinkRef.identifier.toString().includes(',')) {
    const linkRefs = prLinkRef.identifier.toString().split(',');
    linkRefs.forEach(prNum => {
      prLinks.push({
        type: 'linkReference',
        identifier: prNum,
        label: prNum,
        referenceType: 'collapsed',
        children: [text(prNum)]
      }, text(', '));
    });
  } else {
    prLinks.push(prLinkRef);
  }
  return prLinks;
}

const createRepoReleasesLink = (githubRepo) => {
  return {
    type: 'definition',
    identifier: 'pwa studio releases',
    label: 'PWA Studio releases',
    url: `https://github.com/${githubRepo}/releases`,
    title: null,
  }
}

// Jira ticket reference links for the summary table
const createJiraLinkRef = ticketNumber => {
  return ({
    type: 'linkReference',
    identifier: ticketNumber,
    label: ticketNumber,
    referenceType: 'collapsed',
    children: [text(ticketNumber)]
  });
};

// GitHub PR reference links for the summary table
function createPrLinkRef(prNumber) {
  return {
    type: 'linkReference',
    identifier: prNumber,
    label: prNumber,
    referenceType: 'collapsed',
    children: [text(prNumber)]
  };
}

const createJiraLinkDefinitions = jiraIssues => {
  const jiraLinkDefs = [];

  const createJiraLinkDef = (jiraIssue) => {
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
    const linkDefinition = createJiraLinkDef(jiraIssue);
    jiraLinkDefs.push(linkDefinition);
    jiraLinkDefs.push(text('\n'));
  })
  return root({ type: 'paragraph', children: jiraLinkDefs })
};

const createPrLinkDefinitions = jiraIssues => {
  const prLinkDefs = [];

  const createPrLinkDef = (jiraIssue) => {
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
    const linkDefinitions = createPrLinkDef(jiraIssue);
    if (linkDefinitions.type === undefined) {
      linkDefinitions.forEach(linkDefinition => {
        prLinkDefs.push(linkDefinition);
        prLinkDefs.push(text('\n'));
      })
    } else {
      prLinkDefs.push(linkDefinitions);
      prLinkDefs.push(text('\n'));
    }
  })

  return root({ type: 'paragraph', children: prLinkDefs })
};

const createSummaryTable = jiraIssues => {

  const tableHeader = tableRow([
    tableCell([text('Type')]),
    tableCell([text('Description')]),
    tableCell([text('GitHub PR(s)')]),
    tableCell([text('Jira Issue')]),
  ]);

  const createTableRow = ({ issuetype, key, prNumber, title }) => {
    const prLinkReferences = createPrLinks(prNumber);
    const jiraLinkReference = createJiraLinkRef(key);
    return tableRow([
      tableCell([text(issuetype)]),
      tableCell([text(title || '')]),
      tableCell(prLinkReferences),
      tableCell(jiraLinkReference),
    ]);
  };
  const summaryTableRows = jiraIssues.map(jiraIssue => createTableRow(jiraIssue))
  const summaryTableNode = table(['left', 'left', 'left'], [tableHeader, ...summaryTableRows]);

  return root(summaryTableNode);
};

const createHighlights = (jiraIssues, githubPRs) => {
  const highlights = [];

  //TODO: Use the githubPRs to create a list of PRs that don't have a Jira ticket
  //TODO: Use issue type to create a list of issues that don't have a PR
  jiraIssues.map(({ releaseNotes, issuetype, key, prNumber }) => {
    const prNumberLinks = createPrLinks(prNumber);
    if (releaseNotes) {
      highlights.push(list('unordered', [
        listItem([
          paragraph([
            text(releaseNotes),
            text(' (GitHub PR: '),
            createPrLinkRef(prNumber),
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
            createJiraLinkRef(key)
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

export function getPrLinks(jiraIssues, githubPRs) {
  const processor = unified().use(stringify, {});
  const prLinks = processor.stringify(createPrLinkDefinitions(jiraIssues, githubPRs));
  return prLinks;
}

export function getRepoLink(githubRepo) {
  const processor = unified().use(stringify, {});
  const repoReleasesLink = processor.stringify(createRepoReleasesLink(githubRepo));
  return repoReleasesLink;
}
