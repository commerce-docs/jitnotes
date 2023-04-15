/*
Copyright © Adobe, Inc. All rights reserved.
See COPYING.txt for license details.
*/

const prs = [];

const getLabels = (labels) => {
    return labels.map(({ name }) => name);
};

const createPrObject = ({ title, number, labels, body, html_url, user, state, closed_at, }) =>
({
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
});

const createGitHubPrObjects = async githubData => {
    githubData.map(pr => {
        prs.push(createPrObject(pr))
    });
    return prs;
};

export default createGitHubPrObjects;
