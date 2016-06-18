import 'isomorphic-fetch';

export const get = fetch;

export const getJson = (url) => (
    get(url)
        .then((resp) => resp.json())
);
