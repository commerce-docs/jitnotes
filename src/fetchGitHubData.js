const fetch = require('node-fetch');

const fetchGitHubData = (repo, startDate, endDate) => {
  const url = `https://api.github.com/search/issues?q=repo:${repo}+is:pr+is:merged+merged:${startDate}..${endDate}&sort=created&order=asc`;
  return fetch(url)
    .then(res => res.json())
    .then(json => json.items);
};

module.exports = fetchGitHubData;
