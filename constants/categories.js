export default {
    reactEnv: {
        label: 'React Environment',
        packages: [
            'react-dom',
            'react-native',
        ]
    },
    babel: {
        label: 'Babel',
        basePackage: 'babel-cli',
        packages: [
            'babel-preset-es2015',
            'babel-preset-stage-0',
            'babel-preset-stage-1',
            'babel-preset-stage-2',
            'babel-preset-stage-3',
        ],
        multi: true
    },
    build: {
        label: 'Builder',
        packages: [
            'grunt',
            'gulp'
        ]
    },
    bundler: {
        label: 'Bundler',
        packages: [
            'webpack',
            'browserify',
        ]
    },
    hot: {
        label: 'Hot-module reloading',
        packages: [
            'react-hot-loader'
        ]
    },
    cssUtils: {
        label: 'CSS Utils',
        packages: [
            'postcss',
            'autoprefixer',
            'sass-loader',
        ],
        multi: true
    },
    electron: {
        label: 'Electron',
        packages: [
            'electron-prebuilt'
        ]
    },
    eslint: {
        label: 'ESLint',
        basePackage: 'eslint',
        packages: [
            'eslint-config-airbnb',
            'eslint-config-eventbrite',
            'eslint-plugin-react',
            'eslint-plugin-jsx-a11y',
            'eslint-plugin-import',
        ],
        multi: true
    },
    esShim: {
        label: 'ES Shims',
        packages: [
            'core-js',
            'es6-promise',
            'babel-polyfill',
        ]
    },
    flux: {
        label: 'Flux Pattern',
        packages: [
            'redux',
            'flux',
            'reflux'
        ]
    },
    functional: {
        label: 'Functional',
        packages: [
            'underscore',
            'lodash',
            'lazyjs.js',
            'immutable'
        ]
    },
    routing: {
        label: 'Routing',
        packages: [
            'react-router',
            'uniloc',
        ]
    },
    server: {
        label: 'Isomporpic/Universal',
        packages: [
            'express',
            'webpack-dev-server',
            'serve',
        ]
    },
    testAssertion: {
        label: 'Test Assertion',
        packages: [
            'chai',
            'jasmine'
        ]
    },
    testFramework: {
        label: 'Test Framework',
        packages: [
            'mocha',
            'jest',
            'ava',
        ]
    },
    testRunner: {
        label: 'Test Runner',
        packages: [
            'karma'
        ]
    },
    testUtils: {
        label: 'Test Utilities',
        packages: [
            'enzyme',
            'sinon',
            'react-addons-test-utils',
            'isparta',
            'coveralls',
        ],
        multi: true
    },
    fetcb: {
        label: 'AJAX',
        packages: [
            'whatwg-fetch',
            'isomorphic-fetch',
            'falcor',
            'graphql-relay'
        ],
        multi: true
    },
    animation: {
        label: 'Animation',
        packages: [
            'react-addons-css-transition-group',
            'react-motion',
            'react-animate',
        ]
    },
    components: {
        label: 'Components',
        packages: [
            'react-bootstrap',
            'react-select',
            'material-ui',
            'react-foundation',
            'elemental',
            'rebass',
        ],
        multi: true
    },
};
