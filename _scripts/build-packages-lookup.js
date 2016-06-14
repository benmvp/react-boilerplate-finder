/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import {suckPackages} from '../utils/package';
import categories from '../constants/categories';

const PACKAGES_FILE = path.join(__dirname, '../data/packages.json');

console.log('Sucking out packages list from categories');

let packages = suckPackages(categories);

console.log('Building packages lookup by retrieving latest version for each package');

let packagesLookup = packages.reduce((prevLookup, packageName) => {
    let lookup = prevLookup;

    // TODO: Retrieve latest version from NPM

    lookup[packageName] = '';

    return lookup;
}, {});

console.log('Writing', PACKAGES_FILE);

fs.writeFileSync(PACKAGES_FILE, JSON.stringify(packagesLookup, null, 4));

console.log('Wrote', PACKAGES_FILE);
