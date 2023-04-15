/*
 * Questions for user
 * --------------------
 * The answers to the following questions are stored
 * in the names of each question object defined below.
 */

import chalk from "chalk";
import inquirer from "inquirer";

export default function askQuestions() {
  const validDates = new RegExp(/^(202[0-5]-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])|(202[0-5]-(02)-(0[1-9]|1[0-9]|2[0-8]))|(202[0-4]-(04|06|09|11)-(0[1-9]|[12][0-9]|30))|(202[0-5]-(01|03|05|07|08|10|12)-(0[1-9]|[12][0-9]|3[01])))$/);
  const validVersion = new RegExp(/^(?:\d|[0-9]\d)\.(?:[0-9])\.(?:[0-9])$/);

  //TODO: Add more project options after figuring out how to link the right GitHub repos to each project. Addition projects should include: 'USF', 'COMDOX', 'DEVSITE', 'CSS'
  const questions = [
    {
      name: 'jiraProject',
      type: 'list',
      message: chalk.green(`Choose a ${chalk.yellow('Jira project')} for your release notes:`),
      choices: ['PWA'],
      default: 'PWA',
    },
    {
      name: 'releaseVersion',
      type: 'input',
      message: chalk.green(`Enter the ${chalk.yellow('version number')} to be released (Ex: 13.1.0):`),
      default: '13.1.0',
      validate: thisAnswer => validVersion.test(thisAnswer) ? true : 'Please enter a valid version number: XX.X.X',
      when: priorAnswers => priorAnswers['jiraProject'] === 'PWA',
    },
    {
      name: 'previousVersion',
      type: 'input',
      message: chalk.green(`Enter the ${chalk.yellow('previous version number')} released (13.0.0):`),
      default: '13.0.0',
      validate: thisAnswer => validVersion.test(thisAnswer) ? true : 'Please enter a valid version number: XX.X.X',
      when: priorAnswers => priorAnswers['jiraProject'] === 'PWA',
    },
    {
      name: 'ticketStatus',
      type: 'list',
      message: chalk.green(`Choose the ${chalk.yellow('status')} of the tickets to include:`),
      choices: ['Deployment Queue', 'Done'],
      default: 'Deployment Queue',
    },
    {
      name: 'startDate',
      type: 'input',
      message: chalk.green(`Enter the ${chalk.yellow('start date')} from which tickets are included (YYYY-MM-DD):`),
      default: '2023-01-01',
      validate: thisAnswer => validDates.test(thisAnswer) ? true : 'Please use a valid date: YYYY-MM-DD.',
    },
    {
      name: 'endDate',
      type: 'input',
      message: chalk.green(`Enter the ${chalk.yellow('end date')} after which tickets are be excluded (YYYY-MM-DD):`),
      default: '2023-12-31',
      validate: thisAnswer => validDates.test(thisAnswer) ? true : 'Please use a valid date: YYYY-MM-DD.',
    },
  ];
  return inquirer.prompt(questions);
}
