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

const createLinkReference = (type, identifier) => ({
  type,
  identifier,
  label: identifier,
  referenceType: 'collapsed',
  children: [text(identifier)]
});

const createLinkDefinition = (type, identifier, url) => ({
  type,
  identifier,
  label: identifier,
  url,
  title: null,
});

const createSummaryTable = jiraIssues => {
  const tableHeader = tableRow([
    tableCell([text('Type')]),
    tableCell([text('Description')]),
    tableCell([text('GitHub PR(s)')]),
    tableCell([text('Jira Issue')]),
  ]);

  const createTableRow = ({ issuetype, key, prNumber, title }) => {
    const prNumbers = (typeof prNumber === 'string') ? prNumber.split(',') : [];
    return tableRow([
      tableCell([text(issuetype)]),
      tableCell([text(title || '')]),
      tableCell(prNumbers.map(pr => createLinkReference('linkReference', pr))),
      tableCell(createLinkReference('linkReference', key)),
    ]);
  };

  return root(table(['left', 'left', 'left'], [tableHeader, ...jiraIssues.map(createTableRow)]));
};

const createHighlights = jiraIssues => root({
  type: 'paragraph',
  children: jiraIssues.flatMap(({ releaseNotes, key, prNumber }) => {
    const prNumbers = (typeof prNumber === 'string') ? prNumber.split(',') : [];
    const prLinks = prNumbers.map(pr => createLinkReference('linkReference', pr));

    const listItemParagraphChildren = [
      text(releaseNotes ? releaseNotes : 'ADD MISSING RELEASE NOTE ENTRY HERE --> '),
      ...prLinks.length > 0 ? [text(' (GitHub PR: '), ...prLinks, text(')')] : [],
    ];

    if (!releaseNotes) {
      listItemParagraphChildren.push(createLinkReference('linkReference', key));
    }

    return [
      list('unordered', [
        listItem([
          paragraph(listItemParagraphChildren)
        ])
      ]),
      text('\n')
    ];
  })
});

const createLinkDefinitions = (jiraIssues, getLink) => root({
  type: 'root',
  children: jiraIssues.flatMap(issue => {
    const linkData = getLink(issue);
    if (!linkData) {
      return [];
    }
    return linkData.map(([identifier, url]) => createLinkDefinition('definition', identifier, url));
  })
});

const getGithubLinkData = jiraIssue => {
  if (!jiraIssue.prNumber || !jiraIssue.prLink) return [];

  const prNumbers = (typeof jiraIssue.prNumber === 'string') ? jiraIssue.prNumber.split(',') : [];
  const prLinks = (typeof jiraIssue.prLink === 'string') ? jiraIssue.prLink.split(',') : [];

  if (prNumbers.length !== prLinks.length) {
    console.warn(`Mismatch in PR numbers and PR links for issue ${jiraIssue.key}.`);
    return [];
  }

  return prNumbers.map((prNumber, index) => [prNumber, prLinks[index]]);
};

const createGithubLinkDefinitions = jiraIssues => createLinkDefinitions(jiraIssues, getGithubLinkData);

export function getHighlights(jiraIssues) {
  return unified().use(stringify, {}).stringify(createHighlights(jiraIssues));
}

export function getSummaryTable(jiraIssues) {
  return toMarkdown(createSummaryTable(jiraIssues), { extensions: [gfmTableToMarkdown()] });
}

export function getJiraLinks(jiraIssues) {
  return unified().use(stringify, {}).stringify(createLinkDefinitions(jiraIssues, issue => [
    [issue.key, `https://jira.corp.adobe.com/browse/${issue.key}`]
  ]));
}

export function getGithubLinks(jiraIssues) {
  return unified()
    .use(stringify, {})
    .stringify(createGithubLinkDefinitions(jiraIssues));
}

export function getGithubReleasesLink() {
  return unified()
    .use(stringify, {})
    .stringify(
      root(
        createLinkDefinition(
          "definition",
          "pwa studio releases",
          "https://github.com/magento/pwa-studio/releases"
        )
      )
    );
}
