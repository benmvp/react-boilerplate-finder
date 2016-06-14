export default {
    react: {
        label: 'React',
        packages: [
            'react'
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
    cssUtils: {
        label: 'CSS Utils',
        packages: [
            'postcss',
            'autoprefixer',
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
    routing: {
        label: 'Routing',
        packages: [
            'react-router'
        ]
    },
    server: {
        label: 'Isomporpic/Universal',
        packages: [
            'express'
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
            'jest'
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
        ],
        multi: true
    }
};
