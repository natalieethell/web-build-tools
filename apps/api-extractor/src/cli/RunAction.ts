// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as colors from 'colors';
import * as os from 'os';
import * as path from 'path';
import {
  JsonFile,
  PackageJsonLookup,
  FileSystem,
  IPackageJson
} from '@microsoft/node-core-library';

import {
  CommandLineAction,
  CommandLineStringParameter,
  CommandLineFlagParameter
} from '@microsoft/ts-command-line';

import { Extractor } from '../api/Extractor';
import { IExtractorConfig } from '../api/IExtractorConfig';

import { ApiExtractorCommandLine } from './ApiExtractorCommandLine';

const AE_CONFIG_FILENAME: string = 'api-extractor.json';

export class RunAction extends CommandLineAction {
  private _configFileParameter: CommandLineStringParameter;
  private _localParameter: CommandLineFlagParameter;
  private _typescriptCompilerFolder: CommandLineStringParameter;
  private _skipLibCheck: CommandLineFlagParameter;

  constructor(parser: ApiExtractorCommandLine) {
    super({
      actionName: 'run',
      summary: 'Invoke API Extractor on a project',
      documentation: 'Invoke API Extractor on a project'
    });
  }

  protected onDefineParameters(): void { // override
    this._configFileParameter = this.defineStringParameter({
      parameterLongName: '--config',
      parameterShortName: '-c',
      argumentName: 'FILE',
      description: `Use the specified ${AE_CONFIG_FILENAME} file path, rather than guessing its location`
    });

    this._localParameter = this.defineFlagParameter({
      parameterLongName: '--local',
      parameterShortName: '-l',
      description: 'Indicates that API Extractor is running as part of a local build,'
        + ' e.g. on a developer\'s machine. This disables certain validation that would'
        + ' normally be performed for a ship/production build. For example, the *.api.ts'
        + ' review file is automatically copied in a local build.'
    });

    this._typescriptCompilerFolder = this.defineStringParameter({
      parameterLongName: '--typescript-compiler-folder',
      argumentName: 'PATH',
      description: 'By default API Extractor uses its own TypeScript compiler version to analyze your project.'
        + ' This can often cause compiler errors due to incompatibilities between different TS versions.'
        + ' Use "--typescript-compiler-folder" to specify the folder path for your compiler version.'
    });

    this._skipLibCheck = this.defineFlagParameter({
      parameterLongName: '--skip-lib-check',
      description: 'This flag causes the typechecker to be invoked with the --skipLibCheck option. This option is not'
        + ' recommended and may cause API Extractor to produce incomplete or incorrect declarations, but it '
        + ' may be required when dependencies contain declarations that are incompatible with the TypeScript engine'
        + ' that API Extractor uses for its analysis. If this option is used, it is strongly recommended that broken'
        + ' dependencies be fixed or upgraded.'
    });
  }

  protected onExecute(): Promise<void> { // override
    const lookup: PackageJsonLookup = new PackageJsonLookup();
    let configFilename: string;

    let typescriptCompilerFolder: string | undefined = this._typescriptCompilerFolder.value;
    if (typescriptCompilerFolder) {
      typescriptCompilerFolder = path.normalize(typescriptCompilerFolder);

      if (FileSystem.exists(typescriptCompilerFolder)) {
        typescriptCompilerFolder = lookup.tryGetPackageFolderFor(typescriptCompilerFolder);
        const typescriptCompilerPackageJson: IPackageJson | undefined = typescriptCompilerFolder
          ? lookup.tryLoadPackageJsonFor(typescriptCompilerFolder)
          : undefined;
        if (!typescriptCompilerPackageJson) {
          throw new Error(
            `The path specified in the ${this._typescriptCompilerFolder.longName} parameter is not a package.`
          );
        } else if (typescriptCompilerPackageJson.name !== 'typescript') {
          throw new Error(
            `The path specified in the ${this._typescriptCompilerFolder.longName} parameter is not a TypeScript`
            + ' compiler package.'
          );
        }
      } else {
        throw new Error(
          `The path specified in the ${this._typescriptCompilerFolder.longName} parameter does not exist.`
        );
      }
    }

    if (this._configFileParameter.value) {
      configFilename = path.normalize(this._configFileParameter.value);
      if (!FileSystem.exists(configFilename)) {
        throw new Error('Config file not found: ' + this._configFileParameter.value);
      }
    } else {
      // Otherwise, figure out which project we're in and look for the config file
      // at the project root
      const packageFolder: string | undefined = lookup.tryGetPackageFolderFor('.');

      // If there is no package, then try the current directory
      const baseFolder: string = packageFolder ? packageFolder : process.cwd();

      // First try the standard "config" subfolder:
      configFilename = path.join(baseFolder, 'config', AE_CONFIG_FILENAME);
      if (FileSystem.exists(configFilename)) {
        if (FileSystem.exists(path.join(baseFolder, AE_CONFIG_FILENAME))) {
          throw new Error(`Found conflicting ${AE_CONFIG_FILENAME} files in "." and "./config" folders`);
        }
      } else {
        // Otherwise try the top-level folder
        configFilename = path.join(baseFolder, AE_CONFIG_FILENAME);

        if (!FileSystem.exists(configFilename)) {
          throw new Error(`Unable to find an ${AE_CONFIG_FILENAME} file`);
        }
      }

      console.log(`Using configuration from ${configFilename}` + os.EOL + os.EOL);
    }

    const config: IExtractorConfig = JsonFile.loadAndValidate(configFilename, Extractor.jsonSchema);
    const extractor: Extractor = new Extractor(
      config,
      {
        localBuild: this._localParameter.value,
        typescriptCompilerFolder: typescriptCompilerFolder,
        skipLibCheck: this._skipLibCheck.value
      }
    );

    if (!extractor.processProject()) {
      console.log(os.EOL + colors.yellow('API Extractor completed with errors or warnings'));
      process.exitCode = 1;
    }
    return Promise.resolve();
  }
}
