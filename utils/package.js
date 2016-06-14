import Lazy from 'lazy.js';

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
