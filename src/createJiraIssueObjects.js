
const issues = [];

function getIssue(issueKey) {
    return issues.filter(issue => issue.key === issueKey);
}

function getPrNumber(prUrl) {
    if (prUrl == null) return '';
    return prUrl.replace(/\s{2,}/g, ' ').split(' ').slice(0).map(url => url.split('/').pop());
}

function getPrLink(prUrl) {
    if (prUrl == null) return '';
    return prUrl.replace(/\s{2,}/g, ' ').split(' ').slice(0);
}

const createIssueObject = ({ key, fields: { summary, description, issuetype, customfield_12609, customfield_13904, status, assignee, fixVersions } }) => {
    return {
        key: key,
        title: summary,
        releaseNotes: customfield_12609,
        description: description,
        issuetype: issuetype.name,
        assignee: assignee?.displayName,
        prNumber: getPrNumber(customfield_13904).toString(),
        prLink: getPrLink(customfield_13904).toString(),
        releaseStatus: status.name,
        releaseVersion: fixVersions[0].name.split('-').pop(),
    };
};

const createJiraIssueObjects = async jiraData => {
    jiraData.map(issue => {
        let tempIssue = createIssueObject(issue);
        issues.push(tempIssue);
    });

    return issues;
};

module.exports = createJiraIssueObjects;
