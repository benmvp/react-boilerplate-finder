/* eslint-disable no-unused-expressions */

import {expect} from 'chai';
import {suckPackages} from './package';

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
