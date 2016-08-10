/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import {suckPackages, getPackagesLookup} from '../utils/package';
import categories from '../constants/categories';

const PACKAGES_FILE = path.join(__dirname, '../data/packages.json');

// Get meta data for each package within `categories`
// and save to `PACKAGES_FILE` lookup

console.log('Sucking out packages list from categories');

let packageNames = suckPackages(categories);

console.log('Building packages lookup by retrieving latest version for each package');

getPackagesLookup(packageNames)
    .then((packagesLookup) => {
        console.log('Writing', PACKAGES_FILE);

        fs.writeFileSync(PACKAGES_FILE, JSON.stringify(packagesLookup, null, 4));

        console.log('Wrote', PACKAGES_FILE);
    })
    .catch((ex) => console.error(ex));
