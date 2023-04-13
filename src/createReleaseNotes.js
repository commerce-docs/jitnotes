import { toMarkdown } from 'mdast-util-to-markdown'
import { gfmTableToMarkdown } from 'mdast-util-gfm-table'

import {
  brk, emphasis,
  heading,
  link,
  list,
  listItem,
  paragraph,
  root,
  table,
  tableCell,
  tableRow,
  separator, strong,
  text
} from "mdast-builder";

import { unified } from "unified";
import stringify from "remark-stringify";

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

function createIntroduction(releaseVersion) {
  return root([
    heading(1, text(`PWA Studio Release ${releaseVersion}`)),
    paragraph([
      paragraph(strong(text(`NOTE:`))),
      brk,
      paragraph(emphasis(text(`This changelog only contains release notes for PWA Studio and Venia ${releaseVersion}`))),
      brk,
      paragraph(emphasis(text(`For older release notes, see`))),
      text(' '),
      {
        type: 'linkReference',
        identifier: 'pwa studio releases',
        label: 'PWA Studio releases',
        referenceType: 'collapsed',
        children: [text('PWA Studio releases')],
      },
      text('.'),
    ])
  ]);
}

const CreateBoilerPlate = (jiraIssues) => {
  // TODO: Create other related boilerplate updates
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
      url: 'https://jira.corp.adobe.com/browse/' + jiraIssue.key,
      title: null,
    };
  };

  jiraIssues.map(jiraIssue => {
    const linkDefinition = createJiraLinkDefinition(jiraIssue);
    jiraLinkDefinitions.push(linkDefinition);
    jiraLinkDefinitions.push(brk);
  })
  return root({ type: 'paragraph', children: jiraLinkDefinitions })
};

const createGithubLinkDefinitions = jiraIssues => {
  const githubLinkDefinitions = [];

  const createGithubLinkDefinition = (jiraIssue) => {
    if (!jiraIssue.prNumber)
      return text('');
    // If the jiraIssue has more than one associated PR, create a link for each PR
    if (jiraIssue.prNumber.includes(',')) {
      const prNumbers = jiraIssue.prNumber.split(',');
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
    tableCell([text('GitHub PR')]),
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
  highlights.push(heading(2, text(`Highlights`)), brk, brk)

  jiraIssues.map(({ releaseNotes, issuetype, key, prNumber }) => {
    const prNumberLinks = createGitHubPrLinks(prNumber);
    if (releaseNotes) {
      highlights.push(list('unordered', [
        listItem([
          paragraph([
            text(issuetype),
            text(': '),
            createGitHubLinkReference(prNumber),
            text(' — '),
            text(releaseNotes),
          ])
        ])
      ]));
      highlights.push(brk)
    } else {
      highlights.push(list('unordered', [
        listItem([
          paragraph([
            text('MISSING JIRA RELEASE NOTE'),
            text(' — '),
            createJiraLinkReference(key)
          ])
        ])]));
      highlights.push(brk)
    }
  })

  return root({ type: 'paragraph', children: highlights, })
};

const createReleaseNotes = (jiraIssues, githubPRs) => {
  const processor = unified().use(stringify, {});
  const releaseVersion = jiraIssues[0].releaseVersion;
  const introduction = processor.stringify(createIntroduction(releaseVersion));
  const highlights = processor.stringify(createHighlights(jiraIssues, githubPRs));
  const summaryTable = toMarkdown(createSummaryTable(jiraIssues, githubPRs), { extensions: [gfmTableToMarkdown()] });
  const jiraLinks = processor.stringify(createJiraLinkDefinitions(jiraIssues, githubPRs));
  const githubLinks = processor.stringify(createGithubLinkDefinitions(jiraIssues, githubPRs));
  const githubReleasesLink = processor.stringify(createLinkToGitHubReleases(jiraIssues, githubPRs));

  return `${introduction}\n\n${highlights}\n\n${summaryTable}\n\n${jiraLinks}\n\n${githubLinks}\n\n${githubReleasesLink}\n\n`;
};

export default createReleaseNotes;

function createGitHubPrLinks(prNumber) {
  const ghLinkReferences = [];
  const githubLinkReference = createGitHubLinkReference(prNumber);

  if (githubLinkReference.identifier.includes(',')) {
    const linkReferences = githubLinkReference.identifier.split(',');
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

