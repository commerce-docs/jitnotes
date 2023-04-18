#! /usr/bin/env node

/*
Copyright © Adobe, Inc. All rights reserved.
See COPYING.txt for license details.
*/

function getLabels(labels) {
  return labels.map(({ name }) => name);
}

function getPrNumber(prUrl) {
  if (prUrl == null) return '';
  return prUrl.replace(/\s{2,}/g, ' ').split(' ').slice(0).map(url => url.split('/').pop());
}

function getPrLink(prUrl) {
  if (prUrl == null) return '';
  return prUrl.replace(/\s{2,}/g, ' ').split(' ').slice(0);
}

const config = {
  github: {
    content: ({ title, number, labels, body, html_url, user, state, closed_at }) => ({
      prNumber: number,
      prUrl: html_url,
      title: title,
      description: body,
      authorUserName: user.login,
      authorUrl: user.html_url,
      authorPicture: user.avatar_url,
      labels: getLabels(labels),
      state: state,
      timeClosed: closed_at,
    }),
  },
  jira: {
    content: ({ key, fields: { summary, description, issuetype, customfield_12609, customfield_13904, status, assignee, fixVersions } }) => ({
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
    }),
  },
};

const extractContent = async (data, type) => {
  data = await data;
  const { content } = config[type];
  const keyContent = data.map(content);
  return keyContent;
};

export default extractContent;
