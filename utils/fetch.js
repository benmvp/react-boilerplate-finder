import 'isomorphic-fetch';

export const get = (url) => {
    // eslint-disable-next-line no-console
    console.log('fetch', url);

    return fetch(url);
};

export const getJson = (url) => (
    get(url)
        .then((resp) => resp.json())
);
