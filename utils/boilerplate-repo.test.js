/* eslint-disable no-unused-expressions */
import fs from 'fs';
import path from 'path';
import * as fetchUtil from './fetch';
import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {stub} from 'sinon';

import {getInfos} from './boilerplate-repo';

chai.use(chaiAsPromised);

describe('boilerplate-repo utils', () => {
    describe('getInfos', () => {
        const REPO_INFO_FETCH_LOOKUP = {
            'https://api.github.com/repos/chentsulin/electron-react-boilerplate': JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, '../data/test/boilerplate-repos/chentsulin_electron-react-boilerplate_github.json'),
                    'utf8'
                )
            ),
            'https://raw.githubusercontent.com/chentsulin/electron-react-boilerplate/master/package.json': JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, '../data/test/boilerplate-repos/chentsulin_electron-react-boilerplate_package.json'),
                    'utf8'
                )
            ),
            'https://api.github.com/repos/christianalfoni/flux-react-boilerplate': JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, '../data/test/boilerplate-repos/christianalfoni_flux-react-boilerplate_github.json'),
                    'utf8'
                )
            ),
            'https://raw.githubusercontent.com/christianalfoni/flux-react-boilerplate/master/package.json': JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, '../data/test/boilerplate-repos/christianalfoni_flux-react-boilerplate_package.json'),
                    'utf8'
                )
            ),
            'https://api.github.com/repos/mxstbr/react-boilerplate': JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, '../data/test/boilerplate-repos/mxstbr_react-boilerplate_github.json'),
                    'utf8'
                )
            ),
            'https://raw.githubusercontent.com/mxstbr/react-boilerplate/master/package.json': JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, '../data/test/boilerplate-repos/mxstbr_react-boilerplate_package.json'),
                    'utf8'
                )
            ),
        };
        const TEST_BOILERPLATE_REPO_IDS = [
            'chentsulin/electron-react-boilerplate',
            'christianalfoni/flux-react-boilerplate',
            'mxstbr/react-boilerplate',
        ];
        const TEST_PACKAGES_LOOKUP = {
            'react': '15.2.1',
            'babel-cli': '6.11.4',
            'redux': '3.5.2',
            'webpack': '1.13.1'
        };
        let fetchStub;

        beforeEach(() => {
            fetchStub = stub(fetchUtil, 'get', (url) => (
                // Need to return a promise that returns a fake response
                // object that we'll call `.json` on
                Promise.resolve({
                    json() {
                        return REPO_INFO_FETCH_LOOKUP[url];
                    }
                })
            ));
        });

        afterEach(() => fetchStub.restore());

        it('returns an array of boilerplate repo info objects', () => {
            let getInfosPromise = getInfos(TEST_BOILERPLATE_REPO_IDS, TEST_PACKAGES_LOOKUP);

            expect(getInfosPromise).to.eventually.deep.equal([
                {
                    id: 'chentsulin/electron-react-boilerplate'
                },
                {
                    id: 'christianalfoni/flux-react-boilerplate'
                },
                {
                    id: 'mxstbr/react-boilerplate'
                }
            ]);
        });
    });
});
