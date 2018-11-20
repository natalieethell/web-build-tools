// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import {
  TSDocConfiguration,
  TSDocTagDefinition,
  TSDocTagSyntaxKind,
  StandardTags
} from '@microsoft/tsdoc';

export class AedocDefinitions {
  public static readonly betaDocumentation: TSDocTagDefinition = new TSDocTagDefinition({
    tagName: '@betaDocumentation',
    syntaxKind: TSDocTagSyntaxKind.ModifierTag
  });

  public static readonly internalRemarks: TSDocTagDefinition = new TSDocTagDefinition({
    tagName: '@internalRemarks',
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  });

  public static readonly preapprovedTag: TSDocTagDefinition = new TSDocTagDefinition({
    tagName: '@preapproved',
    syntaxKind: TSDocTagSyntaxKind.ModifierTag
  });

  public static get tsdocConfiguration(): TSDocConfiguration {
    if (!AedocDefinitions._tsdocConfiguration) {
      const configuration: TSDocConfiguration = new TSDocConfiguration();
      configuration.addTagDefinitions([
        AedocDefinitions.betaDocumentation,
        AedocDefinitions.internalRemarks,
        AedocDefinitions.preapprovedTag
      ], true);

      configuration.setSupportForTags(
        [
          StandardTags.alpha,
          StandardTags.beta,
          StandardTags.defaultValue,
          StandardTags.deprecated,
          StandardTags.eventProperty,
          StandardTags.example,
          StandardTags.inheritDoc,
          StandardTags.internal,
          StandardTags.link,
          StandardTags.override,
          StandardTags.packageDocumentation,
          StandardTags.param,
          StandardTags.privateRemarks,
          StandardTags.public,
          StandardTags.readonly,
          StandardTags.remarks,
          StandardTags.returns,
          StandardTags.sealed,
          StandardTags.virtual
        ],
        true
      );

      AedocDefinitions._tsdocConfiguration = configuration;
    }
    return AedocDefinitions._tsdocConfiguration;
  }

  private static _tsdocConfiguration: TSDocConfiguration | undefined;
}
