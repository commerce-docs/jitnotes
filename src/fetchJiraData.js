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
      .then(async response => {
        const responseText = await response.text();
        console.log(responseText)
        const parsedResponse = await JSON.parse(responseText);
        console.log(parsedResponse)
        return parsedResponse;
      })
      .then(({ issues }) => {
        console.log(issues)
        return issues;
      });
  } catch (error) {
    console.error(error);
  }
};

export default fetchJiraData;
