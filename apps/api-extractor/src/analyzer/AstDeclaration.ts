// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as ts from 'typescript';
import { AstSymbol } from './AstSymbol';
import { Span } from './Span';

/**
 * Constructor options for AstDeclaration
 */
export interface IAstDeclarationOptions {
  readonly declaration: ts.Declaration;
  readonly astSymbol: AstSymbol;
  readonly parent: AstDeclaration | undefined;
}

/**
 * The AstDeclaration and AstSymbol classes are API Extractor's equivalent of the compiler's
 * ts.Declaration and ts.Symbol objects.  They are created by the SymbolTable class.
 *
 * @remarks
 * The AstDeclaration represents one or more syntax components of a symbol.  Usually there is
 * only one AstDeclaration per AstSymbol, but certain TypeScript constructs can have multiple
 * declarations (e.g. overloaded functions, declaration merging, etc).
 *
 * Because of this the AstDeclaration manages the parent/child nesting hierarchy (e.g. with
 * declaration merging, each declaration has its own children) and becomes the main focus
 * of analyzing AEDoc and emitting *.d.ts files.
 *
 * The AstDeclarations correspond to items from the compiler's ts.Node hierarchy, but
 * omitting/skipping any nodes that don't match the SymbolAnalyzer.isAstDeclaration()
 * criteria.  This simplification makes the other API Extractor stages easier to implement.
 */
export class AstDeclaration {
  public readonly declaration: ts.Declaration;

  public readonly astSymbol: AstSymbol;

  /**
   * The parent, if this object is nested inside another AstDeclaration.
   */
  public readonly parent: AstDeclaration | undefined;

  /**
   * Additional information applied later by the Collector.
   */
  public metadata: unknown;

  private readonly _analyzedChildren: AstDeclaration[] = [];

  private readonly _analyzedReferencedAstSymbolsSet: Set<AstSymbol> = new Set<AstSymbol>();

  public constructor(options: IAstDeclarationOptions) {
    this.declaration = options.declaration;
    this.astSymbol = options.astSymbol;
    this.parent = options.parent;

    this.astSymbol._notifyDeclarationAttach(this);

    if (this.parent) {
      this.parent._notifyChildAttach(this);
    }
  }

  /**
   * Returns the children for this AstDeclaration.
   * @remarks
   * The collection will be empty until AstSymbol.analyzed is true.
   */
  public get children(): ReadonlyArray<AstDeclaration> {
    return this.astSymbol.analyzed ? this._analyzedChildren : [];
  }

  /**
   * Returns the AstSymbols referenced by this node.
   * @remarks
   * NOTE: The collection will be empty until AstSymbol.analyzed is true.
   *
   * Since we assume references are always collected by a traversal starting at the
   * root of the nesting declarations, this array omits the following items because they
   * would be redundant:
   * - symbols corresponding to parents of this declaration (e.g. a method that returns its own class)
   * - symbols already listed in the referencedAstSymbols property for parents of this declaration
   *   (e.g. a method that returns its own class's base class)
   * - symbols that are referenced only by nested children of this declaration
   *   (e.g. if a method returns an enum, this doesn't imply that the method's class references that enum)
   */
  public get referencedAstSymbols(): ReadonlyArray<AstSymbol> {
    return this.astSymbol.analyzed ? [...this._analyzedReferencedAstSymbolsSet] : [];
  }

  /**
   * This is an internal callback used when the SymbolTable attaches a new
   * child AstDeclaration to this object.
   * @internal
   */
  public _notifyChildAttach(child: AstDeclaration): void {
    if (child.parent !== this) {
      throw new Error('Program Bug: Invalid call to notifyChildAttach()');
    }

    if (this.astSymbol.analyzed) {
      throw new Error('Program Bug: _notifyChildAttach() called after analysis is already complete');
    }

    this._analyzedChildren.push(child);
  }

  /**
   * Returns a diagnostic dump of the tree, which reports the hierarchy of
   * AstDefinition objects.
   */
  public getDump(indent: string = ''): string {
    const declarationKind: string = ts.SyntaxKind[this.declaration.kind];
    let result: string = indent + `+ ${this.astSymbol.localName} (${declarationKind})`;
    if (this.astSymbol.nominal) {
      result += ' (nominal)';
    }
    result += '\n';

    for (const referencedAstSymbol of this._analyzedReferencedAstSymbolsSet.values()) {
      result += indent + `  ref: ${referencedAstSymbol.localName}\n`;
    }

    for (const child of this.children) {
      result += child.getDump(indent + '  ');
    }

    return result;
  }

  /**
   * Returns a diagnostic dump using Span.getDump(), which reports the detailed
   * compiler structure.
   */
  public getSpanDump(indent: string = ''): string {
    const span: Span = new Span(this.declaration);
    return span.getDump(indent);
  }

  /**
   * This is an internal callback used when SymbolTable.analyze() discovers a new
   * type reference associated with this declaration.
   * @internal
   */
  public _notifyReferencedAstSymbol(referencedAstSymbol: AstSymbol): void {
    if (this.astSymbol.analyzed) {
      throw new Error('Program Bug: notifyReferencedAstSymbol() called after analysis is already complete');
    }

    for (let current: AstDeclaration | undefined = this; current; current = current.parent) {
      // Don't add references to symbols that are already referenced by a parent
      if (current._analyzedReferencedAstSymbolsSet.has(referencedAstSymbol)) {
        return;
      }
      // Don't add the symbols of parents either
      if (referencedAstSymbol === current.astSymbol) {
        return;
      }
    }

    this._analyzedReferencedAstSymbolsSet.add(referencedAstSymbol);
  }

  /**
   * Visits all the current declaration and all children recursively in a depth-first traversal,
   * and performs the specified action for each one.
   */
  public forEachDeclarationRecursive(action: (astDeclaration: AstDeclaration) => void): void {
    action(this);
    for (const child of this.children) {
      child.forEachDeclarationRecursive(action);
    }
  }
}
