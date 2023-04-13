import dotenv from 'dotenv';
dotenv.config();

import fetch from "node-fetch";

const fetchData = async ({ url, method }) => {
  try {
    return await fetch(url, {
      method: method,
      headers: {
        Authorization: 'Basic ' + process.env.JIRA_AUTH,
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("Fetching JIRA issues failed:" + error);
  }
};

const fetchJiraData = async url => {
  try {
    return fetchData({
      url: url,
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(({ issues }) => {
        return issues;
      });
  } catch (error) {
    console.error(error);
  }
};

export default fetchJiraData;
