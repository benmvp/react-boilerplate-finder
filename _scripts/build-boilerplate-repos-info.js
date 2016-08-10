/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import {getInfos} from '../utils/boilerplate-repo';

const REPOS_FILE = path.join(__dirname, '../data/boilerplate-repos.json');
const BOILERPLATE_REPO_IDS = JSON.parse(fs.readFileSync(REPOS_FILE, 'utf8'));

const PACKAGES_FILE = path.join(__dirname, '../data/packages.json');
const PACKAGES_LOOKUP = JSON.parse(fs.readFileSync(PACKAGES_FILE, 'utf8'));

const REPOS_INFO_FILE = path.join(__dirname, '../data/boilerplate-repos-info.json');

// Get dependency & other meta information for each repo in `REPOS_FILE`
// and save to `REPOS_INFO_FILE`

console.log('Building information for each boilerplate repo');

getInfos(BOILERPLATE_REPO_IDS, PACKAGES_LOOKUP)
    .then((boilerplateReposInfo) => {
        console.log('Writing', REPOS_INFO_FILE);

        fs.writeFileSync(REPOS_INFO_FILE, JSON.stringify(boilerplateReposInfo, null, 4));

        console.log('Wrote', REPOS_INFO_FILE);
    })
    .catch((ex) => console.error(ex));
