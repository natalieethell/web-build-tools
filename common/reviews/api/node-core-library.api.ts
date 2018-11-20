// @beta
class Colors {
  // @internal (undocumented)
  static _normalizeStringOrColorableSequence(value: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static black(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static blackBackground(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static blue(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static blueBackground(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static cyan(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static cyanBackground(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static gray(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static grayBackground(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static green(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static greenBackground(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static magenta(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static magentaBackground(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static red(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static redBackground(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static white(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static whiteBackground(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static yellow(text: string | IColorableSequence): IColorableSequence;
  // (undocumented)
  static yellowBackground(text: string | IColorableSequence): IColorableSequence;
}

// @beta (undocumented)
class ConsoleTerminalProvider implements ITerminalProvider {
  constructor(options?: Partial<IConsoleTerminalProviderOptions>);
  // (undocumented)
  readonly eolCharacter: string;
  // (undocumented)
  readonly supportsColor: boolean;
  // (undocumented)
  verboseEnabled: boolean;
  // (undocumented)
  write(data: string, severity: TerminalProviderSeverity): void;
}

// @public
class Executable {
  static spawnSync(filename: string, args: string[], options?: IExecutableSpawnSyncOptions): child_process.SpawnSyncReturns<string>;
  static tryResolve(filename: string, options?: IExecutableResolveOptions): string | undefined;
}

// @public
enum FileConstants {
  PackageJson = "package.json"
}

// @public
class FileDiffTest {
  static assertEqual(actualFilePath: string, expectedFilePath: string): void;
  static clearCache(): void;
  static prepareFolder(unitTestDirName: string, testModule: string): string;
}

// @public
class FileSystem {
  static appendToFile(filePath: string, contents: string | Buffer, options?: IFileSystemWriteFileOptions): void;
  static changePosixModeBits(path: string, mode: PosixModeBits): void;
  static copyFile(options: IFileSystemCopyFileOptions): void;
  static createHardLink(options: IFileSystemCreateLinkOptions): void;
  static createSymbolicLinkFile(options: IFileSystemCreateLinkOptions): void;
  static createSymbolicLinkFolder(options: IFileSystemCreateLinkOptions): void;
  static createSymbolicLinkJunction(options: IFileSystemCreateLinkOptions): void;
  static deleteFile(filePath: string, options?: IFileSystemDeleteFileOptions): void;
  static deleteFolder(folderPath: string): void;
  static ensureEmptyFolder(folderPath: string): void;
  static ensureFolder(folderPath: string): void;
  static exists(path: string): boolean;
  static formatPosixModeBits(modeBits: PosixModeBits): string;
  static getLinkStatistics(path: string): fs.Stats;
  static getPosixModeBits(path: string): PosixModeBits;
  static getRealPath(linkPath: string): string;
  static getStatistics(path: string): fs.Stats;
  static move(options: IFileSystemMoveOptions): void;
  static readFile(filePath: string, options?: IFileSystemReadFileOptions): string;
  static readFileToBuffer(filePath: string): Buffer;
  static readFolder(folderPath: string, options?: IFileSystemReadFolderOptions): Array<string>;
  static updateTimes(path: string, times: IFileSystemUpdateTimeParameters): void;
  static writeFile(filePath: string, contents: string | Buffer, options?: IFileSystemWriteFileOptions): void;
}

// @public
class FileWriter {
  close(): void;
  static open(path: string, flags?: IFileWriterFlags): FileWriter;
  write(text: string): void;
}

// @public
enum FolderConstants {
  Git = ".git",
  NodeModules = "node_modules"
}

// @beta (undocumented)
interface IColorableSequence {
  // (undocumented)
  backgroundColor?: ColorValue;
  // (undocumented)
  foregroundColor?: ColorValue;
  // (undocumented)
  isEol?: boolean;
  // (undocumented)
  text: string;
}

// @beta
interface IConsoleTerminalProviderOptions {
  verboseEnabled: boolean;
}

// @beta
interface IExecutableResolveOptions {
  currentWorkingDirectory?: string;
  environment?: NodeJS.ProcessEnv;
}

// @beta
interface IExecutableSpawnSyncOptions extends IExecutableResolveOptions {
  input?: string;
  maxBuffer?: number;
  stdio?: ExecutableStdioMapping;
  timeoutMs?: number;
}

// @public
interface IFileSystemCopyFileOptions {
  destinationPath: string;
  sourcePath: string;
}

// @public
interface IFileSystemCreateLinkOptions {
  linkTargetPath: string;
  newLinkPath: string;
}

// @public
interface IFileSystemDeleteFileOptions {
  throwIfNotExists?: boolean;
}

// @public
interface IFileSystemMoveOptions {
  destinationPath: string;
  ensureFolderExists?: boolean;
  overwrite?: boolean;
  sourcePath: string;
}

// @public
interface IFileSystemReadFileOptions {
  convertLineEndings?: NewlineKind;
  encoding?: Encoding;
}

// @public
interface IFileSystemReadFolderOptions {
  absolutePaths?: boolean;
}

// @public
interface IFileSystemUpdateTimeParameters {
  accessedTime: number | Date;
  modifiedTime: number | Date;
}

// @public
interface IFileSystemWriteFileOptions {
  convertLineEndings?: NewlineKind;
  encoding?: Encoding;
  ensureFolderExists?: boolean;
}

// @public
interface IFileWriterFlags {
  append?: boolean;
  exclusive?: boolean;
}

// @public
interface IJsonFileSaveOptions extends IJsonFileStringifyOptions {
  ensureFolderExists?: boolean;
  onlyIfChanged?: boolean;
  updateExistingFile?: boolean;
}

// @public
interface IJsonFileStringifyOptions {
  newlineConversion?: NewlineKind;
  prettyFormatting?: boolean;
}

// @public
interface IJsonSchemaErrorInfo {
  details: string;
}

// @public
interface IJsonSchemaFromFileOptions {
  dependentSchemas?: JsonSchema[];
}

// @public
interface IJsonSchemaValidateOptions {
  customErrorHeader?: string;
}

// @public
interface IPackageJson {
  bin?: string;
  dependencies?: IPackageJsonDependencyTable;
  description?: string;
  devDependencies?: IPackageJsonDependencyTable;
  homepage?: string;
  license?: string;
  main?: string;
  name: string;
  optionalDependencies?: IPackageJsonDependencyTable;
  peerDependencies?: IPackageJsonDependencyTable;
  private?: boolean;
  repository?: string;
  scripts?: IPackageJsonScriptTable;
  // @beta
  tsdoc?: IPackageJsonTsdocConfiguration;
  typings?: string;
  version: string;
}

// @public
interface IPackageJsonDependencyTable {
  [dependencyName: string]: string;
}

// @public
interface IPackageJsonLookupParameters {
  loadExtraFields?: boolean;
}

// @public
interface IPackageJsonScriptTable {
  [scriptName: string]: string;
}

// @beta
interface IPackageJsonTsdocConfiguration {
  tsdocFlavor?: string;
}

// @public
interface IParsedPackageName {
  scope: string;
  unscopedName: string;
}

// @public
interface IParsedPackageNameOrError extends IParsedPackageName {
  error: string;
}

// @public
interface IProtectableMapParameters<K, V> {
  onClear?: (source: ProtectableMap<K, V>) => void;
  onDelete?: (source: ProtectableMap<K, V>, key: K) => void;
  onSet?: (source: ProtectableMap<K, V>, key: K, value: V) => V;
}

// @public
interface IStringBuilder {
  append(text: string): void;
  toString(): string;
}

// @beta
interface ITerminalProvider {
  eolCharacter: string;
  supportsColor: boolean;
  write(data: string, severity: TerminalProviderSeverity): void;
}

// @public
class JsonFile {
  static load(jsonFilename: string): any;
  static loadAndValidate(jsonFilename: string, jsonSchema: JsonSchema, options?: IJsonSchemaValidateOptions): any;
  static loadAndValidateWithCallback(jsonFilename: string, jsonSchema: JsonSchema, errorCallback: (errorInfo: IJsonSchemaErrorInfo) => void): any;
  static save(jsonObject: Object, jsonFilename: string, options?: IJsonFileSaveOptions): boolean;
  static stringify(jsonObject: Object, options?: IJsonFileStringifyOptions): string;
  static updateString(previousJson: string, newJsonObject: Object, options?: IJsonFileStringifyOptions): string;
  static validateNoUndefinedMembers(jsonObject: Object): void;
}

// @public
class JsonSchema {
  ensureCompiled(): void;
  static fromFile(filename: string, options?: IJsonSchemaFromFileOptions): JsonSchema;
  static fromLoadedObject(schemaObject: Object): JsonSchema;
  readonly shortName: string;
  validateObject(jsonObject: Object, filenameForErrors: string, options?: IJsonSchemaValidateOptions): void;
  validateObjectWithCallback(jsonObject: Object, errorCallback: (errorInfo: IJsonSchemaErrorInfo) => void): void;
}

// @beta
class LegacyAdapters {
  static convertCallbackToPromise<TResult, TError>(fn: (cb: callback<TResult, TError>) => void): Promise<TResult>;
  static scrubError(error: Error | string | any): Error;
}

// @public
class LockFile {
  static acquire(resourceDir: string, resourceName: string, maxWaitMs?: number): Promise<LockFile>;
  readonly dirtyWhenAcquired: boolean;
  readonly filePath: string;
  static getLockFilePath(resourceDir: string, resourceName: string, pid?: number): string;
  readonly isReleased: boolean;
  release(): void;
  static tryAcquire(resourceDir: string, resourceName: string): LockFile | undefined;
}

// @public
class MapExtensions {
  static mergeFromMap<K, V>(targetMap: Map<K, V>, sourceMap: Map<K, V>): void;
}

// @public
enum NewlineKind {
  CrLf = "\r\n",
  Lf = "\n"
}

// @public
class PackageJsonLookup {
  constructor(parameters?: IPackageJsonLookupParameters);
  clearCache(): void;
  loadPackageJson(jsonFilename: string): IPackageJson;
  tryGetPackageFolderFor(fileOrFolderPath: string): string | undefined;
  tryGetPackageJsonFilePathFor(fileOrFolderPath: string): string | undefined;
  tryLoadPackageJsonFor(fileOrFolderPath: string): IPackageJson | undefined;
}

// @public
class PackageName {
  static combineParts(scope: string, unscopedName: string): string;
  static getScope(packageName: string): string;
  static getUnscopedName(packageName: string): string;
  static isValidName(packageName: string): boolean;
  static parse(packageName: string): IParsedPackageName;
  static tryParse(packageName: string): IParsedPackageNameOrError;
  static validate(packageName: string): void;
}

// @public
class Path {
  static isUnder(childPath: string, parentFolderPath: string): boolean;
  static isUnderOrEqual(childPath: string, parentFolderPath: string): boolean;
}

// @public
enum PosixModeBits {
  AllExecute = 73,
  AllRead = 292,
  AllWrite = 146,
  GroupExecute = 8,
  GroupRead = 32,
  GroupWrite = 16,
  None = 0,
  OthersExecute = 1,
  OthersRead = 4,
  OthersWrite = 2,
  UserExecute = 64,
  UserRead = 256,
  UserWrite = 128
}

// @public
class ProtectableMap<K, V> {
  constructor(parameters: IProtectableMapParameters<K, V>);
  clear(): void;
  delete(key: K): boolean;
  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  readonly protectedView: Map<K, V>;
  set(key: K, value: V): this;
  readonly size: number;
}

// @public
class Sort {
  static compareByValue(x: any, y: any): number;
  static isSorted<T>(array: T[], comparer?: (x: any, y: any) => number): boolean;
  static isSortedBy<T>(array: T[], keySelector: (element: T) => any, comparer?: (x: any, y: any) => number): boolean;
  static sortBy<T>(array: T[], keySelector: (element: T) => any, comparer?: (x: any, y: any) => number): void;
  static sortMapKeys<K, V>(map: Map<K, V>, keyComparer?: (x: K, y: K) => number): void;
}

// @public
class StringBuilder implements IStringBuilder {
  constructor();
  append(text: string): void;
  toString(): string;
}

// @beta
class Terminal {
  constructor(provider: ITerminalProvider);
  registerProvider(provider: ITerminalProvider): void;
  unregisterProvider(provider: ITerminalProvider): void;
  write(...messageParts: (string | IColorableSequence)[]): void;
  writeError(...messageParts: (string | IColorableSequence)[]): void;
  writeErrorLine(...messageParts: (string | IColorableSequence)[]): void;
  writeLine(...messageParts: (string | IColorableSequence)[]): void;
  writeVerbose(...messageParts: (string | IColorableSequence)[]): void;
  writeVerboseLine(...messageParts: (string | IColorableSequence)[]): void;
  writeWarning(...messageParts: (string | IColorableSequence)[]): void;
  writeWarningLine(...messageParts: (string | IColorableSequence)[]): void;
}

// @beta (undocumented)
enum TerminalProviderSeverity {
  // (undocumented)
  error = 2,
  // (undocumented)
  log = 0,
  // (undocumented)
  verbose = 3,
  // (undocumented)
  warning = 1
}

// @public
class Text {
  static convertToCrLf(input: string): string;
  static convertToLf(input: string): string;
  static ensureTrailingNewline(s: string, newlineKind?: NewlineKind): string;
  static padEnd(s: string, minimumLength: number, paddingCharacter?: string): string;
  static padStart(s: string, minimumLength: number, paddingCharacter?: string): string;
  static replaceAll(input: string, searchValue: string, replaceValue: string): string;
  static truncateWithEllipsis(s: string, maximumLength: number): string;
}

// WARNING: Unsupported export: ExecutableStdioStreamMapping
// WARNING: Unsupported export: ExecutableStdioMapping
// WARNING: Unsupported export: callback
