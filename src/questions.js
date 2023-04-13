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

  const questions = [
    {
      name: 'startDate',
      type: 'input',
      message: chalk.green(`Enter ${chalk.yellow('start date')} (YYYY-MM-DD):`),
      default: '2023-01-01',
      validate: thisAnswer => validDates.test(thisAnswer) ? true : 'Please use a valid date: YYYY-MM-DD.',
    },
    {
      name: 'endDate',
      type: 'input',
      message: chalk.green(`Enter ${chalk.yellow('end date')} (YYYY-MM-DD):`),
      default: '2023-12-31',
      validate: thisAnswer => validDates.test(thisAnswer) ? true : 'Please use a valid date: YYYY-MM-DD.',
    },
  ];
  return inquirer.prompt(questions);
}
