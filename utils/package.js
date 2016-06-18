import Lazy from 'lazy.js';
import {getJson} from './fetch';

const _getLatest = (packageName) => (
    getJson(`http://registry.npmjs.org/${packageName}/latest`)
);

/**
 * Retrieves a list of all the package names defined in the specified `categories` object
 * @param {array} categories - The categories information containing the packages
 * @returns {array}
 */
export const suckPackages = (categories) => (
    Lazy(categories)
        // first convert categories object to an array of pairs ([catId, catInfo])
        .pairs()

        // convert the array of pairs to an array of package names (nested array)
        .map(([, {basePackage, packages}]) => ([basePackage, ...packages]))

        // flatten down the nested array of names to a flat list of name
        .flatten()

        // filter out any undefined package names (since not all have `basePackage`)
        .filter((packageName) => !!packageName)

        // sort just for fun
        .sort()

        // finally return a native array
        .toArray()
);

/**
 * Returns a promise containing a lookup object of package name to latest version
 * @param {array} packageNames - List of packages names
 * @returns {Promise}
 */
export const getPackagesLookup = (packageNames) => (
    // Create an aggregrate promise that will resolve once all of the child promises
    // in the array are resolved by transforming the array of package names to
    // an array of promises that will include the package version
    Promise.all(packageNames.map(_getLatest))
        .then((packageJsons) => (
            // NOTE: `packageJsons` is an array of objects representing the package.json
            // for each package

            // Create an object lookup, using each object's `name` property as the
            // key and its `version` as the value
            Lazy(packageJsons)
                .indexBy('name', 'version')
                .toObject()
        ))
);
