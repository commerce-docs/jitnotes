/*
Copyright © Adobe, Inc. All rights reserved.
See COPYING.txt for license details.
*/

import { cp, cd, ls, sed } from 'shelljs';
import { existsSync } from 'fs';
import { join } from 'path';
import { white } from 'chalk';

export function copyTemplate(jiraProject) {

    const templateDirectory = `${join(__dirname, '../')}templates/${jiraProject.toLowerCase()}`;
    const currentDirectory = process.cwd();

    if (existsSync(templateDirectory)) {
        cp('-R', `${templateDirectory}/*`, currentDirectory);
        console.log(`${white('\n✔ Template copied.')}`);
    } else {
        console.error('\nThe requested template was not found.');
        process.exit(1);
    }
}

export function replaceTemplatePlaceholders(answers) {
    const templates = ls('-Rl', '.');

    for (const template of templates) {
        if (template.isFile()) {
            const questionAnswers = Object.entries(answers);
            for (const [questionName, answer] of questionAnswers) {

                // for shelljs.sed, the global flag must be specified using a regex object. /g flag doesn't work.
                const placeholder = new RegExp(`\\[${questionName.toUpperCase()}\\]`, "g");
                sed('-i', placeholder, answer.toString(), template.name);
            }
        }
    }
    console.log(`${white('✔ Template placeholders replaced.')}`);
    cd('..');
}
