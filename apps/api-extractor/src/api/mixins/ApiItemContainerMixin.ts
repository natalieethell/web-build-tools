// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.s

import { ApiItem, ApiItem_parent, IApiItemJson, IApiItemOptions, IApiItemConstructor } from '../model/ApiItem';

/** @public */
export interface IApiItemContainerMixinOptions extends IApiItemOptions {
  members?: ApiItem[];
}

export interface IApiItemContainerJson extends IApiItemJson {
  members: IApiItemJson[];
}

const _members: unique symbol = Symbol('ApiItemContainerMixin._members');
const _membersSorted: unique symbol = Symbol('ApiItemContainerMixin._membersSorted');
const _membersByCanonicalReference: unique symbol = Symbol('ApiItemContainerMixin._membersByCanonicalReference');
const _membersByName: unique symbol = Symbol('ApiItemContainerMixin._membersByName');

/** @public */
// tslint:disable-next-line:interface-name
export interface ApiItemContainerMixin extends ApiItem {
  /**
   * Returns the members of this container, sorted alphabetically.
   */
  readonly members: ReadonlyArray<ApiItem>;

  /**
   * Adds a new member to the container.
   *
   * @remarks
   * An ApiItem cannot be added to more than one container.
   */
  addMember(member: ApiItem): void;

  tryGetMember(canonicalReference: string): ApiItem | undefined;

  /**
   * Returns a list of members with the specified name.
   */
  findMembersByName(name: string): ReadonlyArray<ApiItem>;

  /** @override */
  serializeInto(jsonObject: Partial<IApiItemJson>): void;
}

/** @public */
export function ApiItemContainerMixin<TBaseClass extends IApiItemConstructor>(baseClass: TBaseClass):
  TBaseClass & (new (...args: any[]) => ApiItemContainerMixin) { // tslint:disable-line:no-any

  abstract class MixedClass extends baseClass implements ApiItemContainerMixin {
    public readonly [_members]: ApiItem[];
    public [_membersSorted]: boolean;
    public [_membersByCanonicalReference]: Map<string, ApiItem>;
    public [_membersByName]: Map<string, ApiItem[]> | undefined;

    /** @override */
    public static onDeserializeInto(options: Partial<IApiItemContainerMixinOptions>,
      jsonObject: IApiItemContainerJson): void {

      baseClass.onDeserializeInto(options, jsonObject);

      options.members = [];
      for (const memberObject of jsonObject.members) {
        options.members.push(ApiItem.deserialize(memberObject));
      }
    }

    // tslint:disable-next-line:no-any
    constructor(...args: any[]) {
      super(...args);
      const options: IApiItemContainerMixinOptions = args[0] as IApiItemContainerMixinOptions;

      this[_members] = [];
      this[_membersByCanonicalReference] = new Map<string, ApiItem>();

      if (options.members) {
        for (const member of options.members) {
          this.addMember(member);
        }
      }
    }

    public get members(): ReadonlyArray<ApiItem> {
      if (!this[_membersSorted]) {
        this[_members].sort((x, y) => x.getSortKey().localeCompare(y.getSortKey()));
        this[_membersSorted] = true;
      }

      return this[_members];
    }

    public addMember(member: ApiItem): void {
      if (this[_membersByCanonicalReference].has(member.canonicalReference)) {
        throw new Error('Another member has already been added with the same name and canonicalReference');
      }

      const existingParent: ApiItem | undefined = member[ApiItem_parent];
      if (existingParent !== undefined) {
        throw new Error(`This item has already been added to another container: "${existingParent.name}"`);
      }

      this[_members].push(member);
      this[_membersByName] = undefined; // invalidate the lookup
      this[_membersSorted] = false;
      this[_membersByCanonicalReference].set(member.canonicalReference, member);

      member[ApiItem_parent] = this;
    }

    public tryGetMember(canonicalReference: string): ApiItem | undefined {
      return this[_membersByCanonicalReference].get(canonicalReference);
    }

    public findMembersByName(name: string): ReadonlyArray<ApiItem> {
      // Build the lookup on demand
      if (this[_membersByName] === undefined) {
        const map: Map<string, ApiItem[]> = new Map<string, ApiItem[]>();

        for (const member of this[_members]) {
          let list: ApiItem[] | undefined = map.get(member.name);
          if (list === undefined) {
            list = [];
            map.set(member.name, list);
          }
          list.push(member);
        }

        this[_membersByName] = map;
      }

      return this[_membersByName]!.get(name) || [];
    }

    /** @override */
    public serializeInto(jsonObject: Partial<IApiItemContainerJson>): void {
      super.serializeInto(jsonObject);

      const memberObjects: IApiItemJson[] = [];

      for (const member of this.members) {
        const memberJsonObject: Partial<IApiItemJson> = {};
        member.serializeInto(memberJsonObject);
        memberObjects.push(memberJsonObject as IApiItemJson);
      }

      jsonObject.members = memberObjects;
    }
  }

  return MixedClass;
}

/** @public */
export namespace ApiItemContainerMixin {
  export function isBaseClassOf(apiItem: ApiItem): apiItem is ApiItemContainerMixin {
    return apiItem.hasOwnProperty(_members);
  }
}
