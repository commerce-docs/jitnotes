#! /usr/bin/env node

/*
Copyright © Adobe, Inc. All rights reserved.
See COPYING.txt for license details.
*/

const keyContent = [];

const getLabels = labels => labels.map(({ name }) => name);
console.log(getLabels)

const getPrNumber = prUrl => prUrl ? prUrl.split('/').pop() : '';

const config = {
  github: {
    content: ({ title, number, labels, body, html_url, user, state, closed_at }) => ({
      prNumber: number,
      prUrl: html_url,
      title,
      description: body,
      authorUserName: user.login,
      authorUrl: user.html_url,
      authorPicture: user.avatar_url,
      labels: getLabels(labels),
      state,
      timeClosed: closed_at,
    }),
  },
  jira: {
    content: ({ key, fields: { summary, description, issuetype, customfield_12609, customfield_13904, status, assignee, fixVersions } }) => ({
      key,
      title: summary,
      releaseNotes: customfield_12609,
      description,
      issuetype: issuetype.name,
      assignee: assignee?.displayName,
      prNumber: getPrNumber(customfield_13904),
      prLink: customfield_13904,
      releaseStatus: status.name,
      releaseVersion: fixVersions[0].name.split('-').pop(),
    }),
  },
};

const extractContent = async (data, type) => {
  data = await data;

  const { content } = config[type];
  keyContent.push(...data.map(content));
  return keyContent;
};

export default extractContent;
