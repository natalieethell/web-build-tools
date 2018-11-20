// @public
declare class DocClass1 {
    // @deprecated (undocumented)
    deprecatedExample(): void;
    exampleFunction(a: string, b: string): string;
    exampleFunction(x: number): number;
    interestingEdgeCases(): void;
    // @eventproperty
    malformedEvent: SystemEvent;
    // @eventproperty
    readonly modifiedEvent: SystemEvent;
    regularProperty: SystemEvent;
    static sumWithExample(x: number, y: number): number;
    tableExample(): void;
}

// @public
declare class SystemEvent {
    addHandler(handler: () => void): void;
}

