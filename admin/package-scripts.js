'use strict';

const clientSrc = './src';
const serverSrc = '../api/server/server.js';

module.exports = {
  scripts: {
    clean: {
      script: 'rimraf ./dist',
      description: 'Remove client build artifacts',
    },
    build: {
      default: {
        script: 'nps clean,build.ngbuild',
        description: 'Build the client distribution',
      },
      ngbuild: {
        script: 'ng build --output-path ./dist',
        description: 'Build client dist using ng build',
      },
    },
    dev: {
      script: 'ng serve --port 9000 --hmr true -e hmr --host 0.0.0.0 --progress false --proxy-config proxy.conf.json',
      description: 'Serve the client app in development mode',
    },
    lint: {
      script: 'ng lint',
      description: 'Lint TypeScript code',
    },
    lbSDK: {
      description: 'Build the LoopBack SDK',
      script: 'NODE_ENV=codegen lb-sdk --wipe enabled ${serverSrc} ${clientSrc}/lib/lb-sdk',
    },
    test: {
      default: {
        script: 'nps test.e2e.install,test.e2e,test.unit',
        description: 'Run the full client test suite',
      },
      e2e: {
        default: {
          script: 'protractor',
          description: 'Run protractor e2e tests',
        },
        install: {
          script: 'webdriver-manager update --standalone false --gecko false',
          description: 'Update WebDriver',
        },
      },
      unit: {
        default: {
          script: 'ng test --watch false --code-coverage',
          description: 'Run the unit tests with code coverage (single run)',
        },
        watch: {
          script: 'ng test',
          description: 'Run the unit tests in watch-mode',
        },
      },
    },
  },
}
