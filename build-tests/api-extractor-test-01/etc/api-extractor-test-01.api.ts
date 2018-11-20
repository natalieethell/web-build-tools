// @public
abstract class AbstractClass {
    // (undocumented)
    abstract test(): void;
}

// @public
declare abstract class AbstractClass2 {
    // (undocumented)
    abstract test2(): void;
}

// @public
declare abstract class AbstractClass3 {
    // (undocumented)
    abstract test3(): void;
}

// @public
declare class AmbientConsumer {
    builtinDefinition1(): Map<string, string>;
    builtinDefinition2(): Promise<void>;
    definitelyTyped(): jest.Context;
    localTypings(): IAmbientInterfaceExample;
}

// @public
class ClassExportedAsDefault {
}

// @public (undocumented)
declare class ClassWithSymbols {
    // (undocumented)
    readonly [unexportedCustomSymbol]: number;
    // (undocumented)
    readonly [locallyExportedCustomSymbol]: string;
    // (undocumented)
    [fullyExportedCustomSymbol](): void;
}

// @public
declare class ClassWithTypeLiterals {
    method1(vector: {
        // (undocumented)
        x: number;
        // (undocumented)
        y: number;
    }): void;
    method2(): {
        // (undocumented)
        classValue: ClassWithTypeLiterals;
        // (undocumented)
        callback: () => number;
    } | undefined;
}

// @public
declare class DecoratorTest {
    test(): void;
}

// @public (undocumented)
declare class DefaultExportEdgeCase {
    reference: ClassExportedAsDefault;
}

// @public (undocumented)
declare class ForgottenExportConsumer1 {
    // (undocumented)
    test1(): IForgottenExport | undefined;
}

// @public (undocumented)
declare class ForgottenExportConsumer2 {
    // (undocumented)
    test2(): IForgottenExport_2 | undefined;
}

// @beta
declare class ForgottenExportConsumer3 {
    // (undocumented)
    test2(): IForgottenDirectDependency | undefined;
}

// @public (undocumented)
declare const fullyExportedCustomSymbol: unique symbol;

// @public
interface IInterfaceAsDefaultExport {
    member: string;
}

// @alpha
interface IMergedInterface {
    // (undocumented)
    reference: IMergedInterfaceReferencee;
    // (undocumented)
    type: string;
}

// @alpha
interface IMergedInterface {
    // (undocumented)
    reference: IMergedInterfaceReferencee;
    // (undocumented)
    type: string;
}

// @alpha (undocumented)
interface IMergedInterfaceReferencee {
}

// @public
interface ISimpleInterface {
}

// @public
declare class ReexportedClass {
    // (undocumented)
    getSelfReference(): ReexportedClass;
    // (undocumented)
    getValue(): string;
}

// @public
declare class TypeReferencesInAedoc {
    getValue(arg1: TypeReferencesInAedoc): TypeReferencesInAedoc;
    // (undocumented)
    getValue2(arg1: TypeReferencesInAedoc): TypeReferencesInAedoc;
    // (undocumented)
    getValue3(arg1: TypeReferencesInAedoc): TypeReferencesInAedoc;
}

// @public
declare function virtual(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void;

