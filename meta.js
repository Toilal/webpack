const metalsmith = require('./metalsmith')
const path = require('path')
const fs = require('fs')
const {
  sortDependencies,
  installDependencies,
  runLintFix,
  runTslintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

module.exports = {
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },

  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project',
    },
    author: {
      type: 'string',
      message: 'Author',
    },
    projectType: {
      type: 'list',
      message: 'Project type',
      choices: [
        {
          name: 'Application (Targets end users)',
          value: 'app',
          short: 'Application'
        },
        {
          name: 'Library (Targets developers, includes demo application)',
          value: 'lib',
          short: 'Library'
        }
      ]
    },
    build: {
      type: 'list',
      message: 'Vue build',
      choices: [
        {
          name: 'Runtime + Compiler: recommended for most users',
          value: 'standalone',
          short: 'standalone',
        },
        {
          name:
            'Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere',
          value: 'runtime',
          short: 'runtime',
        },
      ],
    },
    router: {
      type: 'confirm',
      message: 'Install vue-router?',
    },
    sfcExternals: {
      type: 'checkbox',
      message: 'Which tag do you want to externalize as standalone file from Single File Components ?',
      choices: [
        {
          name: '<script>',
          value: 'script',
          short: 'script'
        },
        {
          name: '<style>',
          value: 'style',
          short: 'style'
        },
        {
          name: '<template>',
          value: 'template',
          short: 'template'
        }
      ]
    },
    classStyle: {
      type: 'confirm',
      message: 'Use Class-Style Components (vue-class-component + vue-property-decorators)?',
    },
    compiler: {
      type: 'list',
      message: 'Which language do you want to use?',
      choices: [
        {
          name: 'TypeScript (ts-loader + babel)',
          value: 'typescript',
          short: 'typescript'
        },
        {
          name: 'ES2015 (babel)',
          value: 'es2015',
          short: 'es2015'
        }
      ]
    },
    lint: {
      type: 'confirm',
      message: 'Use ESLint to lint your JavaScript code?',
    },
    lintConfig: {
      when: 'lint',
      type: 'list',
      message: 'Pick an ESLint preset',
      choices: [
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard',
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb',
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none'
        }
      ]
    },
    tslint: {
      when: 'compiler == \'typescript\'',
      type: 'confirm',
      message: 'Use TSLint to lint your TypeScript code?'
    },
    tslintConfig: {
      when: 'tslint',
      type: 'list',
      message: 'Pick a TSLint preset',
      choices: [
        {
          name: 'Standard (https://github.com/blakeembrey/tslint-config-standard)',
          value: 'standard',
          short: 'Standard'
        },
        {
          name: 'AirBNB (https://github.com/progre/tslint-config-airbnb)',
          value: 'airbnb',
          short: 'AirBNB'
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none',
        },
      ],
    },
    unit: {
      type: 'confirm',
      message: 'Set up unit tests',
    },
    runner: {
      when: 'unit',
      type: 'list',
      message: 'Pick a test runner',
      choices: [
        {
          name: 'Jest',
          value: 'jest',
          short: 'jest',
        },
        {
          name: 'Karma and Mocha',
          value: 'karma',
          short: 'karma',
        },
        {
          name: 'none (configure it yourself)',
          value: 'noTest',
          short: 'noTest',
        },
      ],
    },
    e2e: {
      type: 'confirm',
      message: 'Setup e2e tests with Nightwatch?',
    },
    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    '.eslintrc.js': 'lint',
    '.eslintignore': 'lint',
    'tslint.json': 'tslint',
    'tsconfig.json': "compiler == 'typescript'",
    'src/hooks.ts': "compiler == 'typescript' && classStyle",
    'src/hooks.js': "compiler != 'typescript' && classStyle",
    'src/**/*.ts': "compiler == 'typescript'",
    'src/**/*.js': "compiler != 'typescript'",
    'config/test.env.js': 'unit || e2e',
    '**/*.lib.*': "projectType == 'lib'",
    'build/webpack.test.conf.js': "unit && runner === 'karma'",
    'test/unit/specs/**/*.ts': "unit && compiler == 'typescript'",
    'test/unit/specs/**/*.js': "unit && compiler != 'typescript'",
    'test/unit/index.js': "unit && runner === 'karma'",
    'test/unit/jest.conf.js': "unit && runner === 'jest'",
    'test/unit/karma.conf.js': "unit && runner === 'karma'",
    'test/unit/specs/index.js': "unit && runner === 'karma'",
    'test/unit/setup.js': "unit && runner === 'jest'",
    'test/e2e/**/*': 'e2e',
    'src/router/**/*': 'router',
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
      .then(() => {
        return runLintFix(cwd, data, green)
      })
      .then(() => {
        return runTslintFix(cwd, data, green)
      })
      .then(() => {printMessage(data, green)
      }).catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
  "metalsmith": metalsmith
};
