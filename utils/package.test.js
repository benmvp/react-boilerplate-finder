/* eslint-disable no-unused-expressions */

import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {stub} from 'sinon';

import {suckPackages, getPackagesLookup} from './package';

chai.use(chaiAsPromised);

describe('package utils', () => {
    describe('suckPackages', () => {
        describe('for zero categories', () => {
            it('returns empty array for empty categories', () => {
                let packages = suckPackages({});

                expect(packages).to.be.an.array;
                expect(packages).to.be.empty;
            });
        });

        describe('for single category', () => {
            it('returns a single package when one is defined in `packages` for single category', () => {
                let packages = suckPackages({
                    react: {
                        packages: ['react']
                    }
                });

                expect(packages).to.deep.equal(['react']);
            });

            it('returns multiple packages when multiple are defined in `packages` for single category', () => {
                let packages = suckPackages({
                    build: {
                        packages: ['grunt', 'gulp']
                    }
                });

                expect(packages).to.deep.equal(['grunt', 'gulp']);
            });

            it('returns multiple packages with one defined in `packages` and another in `basePackage` for single category', () => {
                let packages = suckPackages({
                    babel: {
                        basePackage: 'babel-cli',
                        packages: [
                            'babel-preset-es2015',
                        ]
                    }
                });

                expect(packages).to.deep.equal([
                    'babel-cli',
                    'babel-preset-es2015',
                ]);
            });

            it('returns multiple packages with multiple defined in `packages` and another in `basePackage` for single category', () => {
                let packages = suckPackages({
                    babel: {
                        basePackage: 'eslint',
                        packages: [
                            'eslint-config-airbnb',
                            'eslint-plugin-import',
                            'eslint-plugin-jsx-a11y',
                            'eslint-plugin-react',
                        ]
                    }
                });

                expect(packages).to.deep.equal([
                    'eslint',
                    'eslint-config-airbnb',
                    'eslint-plugin-import',
                    'eslint-plugin-jsx-a11y',
                    'eslint-plugin-react',
                ]);
            });

            it('returns sorted list of packages for single category', () => {
                let packages = suckPackages({
                    esShim: {
                        packages: [
                            'core-js',
                            'es6-promise',
                            'babel-polyfill',
                        ]
                    }
                });

                expect(packages).to.deep.equal([
                    'babel-polyfill',
                    'core-js',
                    'es6-promise',
                ]);
            });
        });

        describe('for multiple categories', () => {
            it('returns multiple packages when one is defined in `packages` for multiple categories', () => {
                let packages = suckPackages({
                    routing: {
                        packages: ['react-router']
                    },
                    server: {
                        packages: ['express']
                    }
                });

                expect(packages).to.deep.equal([
                    'express',
                    'react-router',
                ]);
            });

            it('returns multiple packages when multiple are defined in `packages` for multiple categories', () => {
                let packages = suckPackages({
                    testFramework: {
                        packages: ['mocha', 'jest']
                    },
                    testRunner: {
                        packages: ['karma']
                    },
                    testUtils: {
                        packages: ['enzyme', 'sinon', 'react-addons-test-utils']
                    }
                });

                expect(packages).to.deep.equal([
                    'enzyme',
                    'jest',
                    'karma',
                    'mocha',
                    'react-addons-test-utils',
                    'sinon',
                ]);
            });

            it('returns multiple packages sorted for a mixture of categories', () => {
                let packages = suckPackages({
                    cssUtils: {
                        packages: ['postcss', 'autoprefixer']
                    },
                    electron: {
                        packages: ['electron-prebuilt']
                    },
                    eslint: {
                        basePackage: 'eslint',
                        packages: [
                            'eslint-config-airbnb',
                            'eslint-plugin-react',
                            'eslint-plugin-jsx-a11y',
                            'eslint-plugin-import',
                        ]
                    }
                });

                expect(packages).to.deep.equal([
                    'autoprefixer',
                    'electron-prebuilt',
                    'eslint',
                    'eslint-config-airbnb',
                    'eslint-plugin-import',
                    'eslint-plugin-jsx-a11y',
                    'eslint-plugin-react',
                    'postcss',
                ]);
            });
        });
    });

    describe('getPackagesLookup', () => {
        const PACKAGE_INFO_FETCH_LOOKUP = {
            'http://registry.npmjs.org/react/latest': {
                name: 'react',
                version: '15.1.0'
            },
            'http://registry.npmjs.org/redux/latest': {
                name: 'redux',
                version: '3.5.2'
            },
            'http://registry.npmjs.org/webpack/latest': {
                name: 'webpack',
                version: '1.13.1'
            },
            'http://registry.npmjs.org/babel-cli/latest': {
                name: 'babel-cli',
                version: '6.10.1'
            }
        };
        const TEST_PACKAGE_NAMES = [
            'babel-cli',
            'react',
            'redux',
            'webpack'
        ];
        let fetchStub;

        beforeEach(() => {
            fetchStub = stub(global, 'fetch', (url) => (
                // Need to return a promise that returns a fake response
                // object that we'll call `.json` on
                Promise.resolve({
                    json() {
                        return PACKAGE_INFO_FETCH_LOOKUP[url];
                    }
                })
            ));
        });

        afterEach(() => fetchStub.restore());

        it('returns package version lookup object', () => {
            let packagesLookupPromise = getPackagesLookup(TEST_PACKAGE_NAMES);

            expect(packagesLookupPromise).to.eventually.deep.equal({
                'babel-cli': '6.10.1',
                'react': '15.1.0',
                'redux': '3.5.2',
                'webpack': '1.13.1'
            });
        });
    });
});
