import Lazy from 'lazy.js';
import {getJson} from './fetch';

const _getGithubInfo = (repoId) => (
    getJson(`https://api.github.com/repos/${repoId}`)
        .then((responseData) => ({
            description: responseData.description,
            url: responseData.html_url,
            imageUrl: responseData.owner.avatar_url,
            numStars: responseData.stargazers_count,
            lastCommitted: responseData.pushed_at,
            numForks: responseData.forks_count,
        }))
);

/*
 * Filters the map of dependencies by those in the packages lookup
 */
const _getPackageDependencies = (dependencies, packagesLookup) => (
    Lazy(dependencies)
        // convert map into array of pairs ([dependency, semver])
        .pairs()

        // filter out the depdencies either not in the packagesLookup
        // or that do not satisfy the dependency SemVer
        .filter(([dependencyName]) => !!packagesLookup[dependencyName])

        // convert back to a native loookup object
        .toObject()
);

/*
 * Parses the specified boilerplate repo's package.json for info
 */
const _getPackageJsonInfo = (repoId, packagesLookup) => (
    getJson(`https://raw.githubusercontent.com/${repoId}/master/package.json`)
        .then(({name, dependencies, devDependencies}) => ({
            name,
            packageDependencies: _getPackageDependencies(
                {
                    ...devDependencies,
                    ...dependencies,
                },
                packagesLookup
            ),
            numDependencies: Object.keys(dependencies).length,
            numDevDependencies: Object.keys(devDependencies).length,
        }))
);

/*
 * Gets various info for the specified boilerplate repo
 * @private
 */
const _getInfo = (repoId, packagesLookup) => (
    // aggregate into a single promise the boilerplate repo info retrieved from
    // github w/ the info parsed its package.json
    Promise.all([
        _getGithubInfo(repoId),
        _getPackageJsonInfo(repoId, packagesLookup)
    ])
        .then(([githubInfo, packageJsonInfo]) => ({
            id: repoId,
            ...githubInfo,
            ...packageJsonInfo,
        }))
);

/**
 * Returns a promise that contains array of info objects for each repoId
 * @param {array} repoIds - An array of boilerplate repo IDs (e.g. "gaearon/react-hot-boilerplate")
 * @param {object} packagesLookup - A lookup of packages to versions
 * @returns {Promise}
 */
export const getInfos = (repoIds, packagesLookup) => (
    // Create an aggregrate promise that will resolve once all of the child promises
    // in the array are resolved by transforming the array of repo IDs to
    // an array of promises that will include the boilerplate repo info
    Promise.all(
        repoIds.map((repoId) => _getInfo(repoId, packagesLookup))
    )
);
