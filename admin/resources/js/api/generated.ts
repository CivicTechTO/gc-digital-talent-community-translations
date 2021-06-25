/* THIS FILE IS AUTO-GENERATED, DO NOT EDIT */
import { gql } from "urql";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: string;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: string;
  /** A RFC 5321 compliant email. */
  Email: string;
  /** A phone number string which must comply with E.164 international notation, including country code and preceding '+'. */
  PhoneNumber: string;
};

export type Classification = {
  __typename?: "Classification";
  id: Scalars["ID"];
  name?: Maybe<LocalizedString>;
  group: Scalars["String"];
  level: Scalars["Int"];
  minSalary?: Maybe<Scalars["Int"]>;
  maxSalary?: Maybe<Scalars["Int"]>;
};

export type ClassificationBelongsToMany = {
  sync?: Maybe<Array<Scalars["ID"]>>;
};

/** e.g. Application Development, Quality Assurance, Enterprise Architecture, IT Project Management, etc. */
export type CmoAsset = {
  __typename?: "CmoAsset";
  id: Scalars["ID"];
  key: Scalars["String"];
  name: LocalizedString;
  description?: Maybe<LocalizedString>;
};

export type CmoAssetBelongsToMany = {
  sync?: Maybe<Array<Scalars["ID"]>>;
};

export type CreateClassificationInput = {
  name?: Maybe<LocalizedStringInput>;
  group: Scalars["String"];
  level: Scalars["Int"];
  minSalary?: Maybe<Scalars["Int"]>;
  maxSalary?: Maybe<Scalars["Int"]>;
};

export type CreateCmoAssetInput = {
  key: Scalars["String"];
  name: LocalizedStringInput;
  description?: Maybe<LocalizedStringInput>;
};

export type CreateOperationalRequirementInput = {
  key: Scalars["String"];
  name: LocalizedStringInput;
  description?: Maybe<LocalizedStringInput>;
};

export type CreatePoolCandidateInput = {
  pool: PoolBelongsTo;
  user: UserBelongsTo;
  cmoIdentifier?: Maybe<Scalars["ID"]>;
  expiryDate?: Maybe<Scalars["Date"]>;
  isWoman?: Maybe<Scalars["Boolean"]>;
  hasDisability?: Maybe<Scalars["Boolean"]>;
  isIndigenous?: Maybe<Scalars["Boolean"]>;
  isVisibleMinority?: Maybe<Scalars["Boolean"]>;
  hasDiploma?: Maybe<Scalars["Boolean"]>;
  languageAbility?: Maybe<LanguageAbility>;
  locationPreferences?: Maybe<Array<Maybe<WorkRegion>>>;
  acceptedOperationalRequirements?: Maybe<OperationalRequirementBelongsToMany>;
  expectedSalary?: Maybe<Array<Maybe<SalaryRange>>>;
  expectedClassifications?: Maybe<ClassificationBelongsToMany>;
  cmoAssets?: Maybe<CmoAssetBelongsToMany>;
  status?: Maybe<PoolCandidateStatus>;
};

export type CreatePoolInput = {
  owner?: Maybe<UserBelongsTo>;
  name?: Maybe<LocalizedStringInput>;
  description?: Maybe<LocalizedStringInput>;
  classifications?: Maybe<ClassificationBelongsToMany>;
  assetCriteria?: Maybe<CmoAssetBelongsToMany>;
  essentialCriteria?: Maybe<CmoAssetBelongsToMany>;
  operationalRequirements?: Maybe<OperationalRequirementBelongsToMany>;
};

/** When creating a User, name and email are required. */
export type CreateUserInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["Email"];
  telephone?: Maybe<Scalars["PhoneNumber"]>;
  preferredLang?: Maybe<Language>;
};

export enum Language {
  En = "EN",
  Fr = "FR",
}

export enum LanguageAbility {
  English = "ENGLISH",
  French = "FRENCH",
  Bilingual = "BILINGUAL",
}

export type LocalizedString = {
  __typename?: "LocalizedString";
  en?: Maybe<Scalars["String"]>;
  fr?: Maybe<Scalars["String"]>;
};

export type LocalizedStringInput = {
  en?: Maybe<Scalars["String"]>;
  fr?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  createPool?: Maybe<Pool>;
  updatePool?: Maybe<Pool>;
  deletePool?: Maybe<Pool>;
  createPoolCandidate?: Maybe<PoolCandidate>;
  updatePoolCandidate?: Maybe<PoolCandidate>;
  deletePoolCandidate?: Maybe<PoolCandidate>;
  createClassification?: Maybe<Classification>;
  updateClassification?: Maybe<Classification>;
  deleteClassification?: Maybe<Classification>;
  createCmoAsset?: Maybe<CmoAsset>;
  updateCmoAsset?: Maybe<CmoAsset>;
  deleteCmoAsset?: Maybe<CmoAsset>;
  createOperationalRequirement?: Maybe<OperationalRequirement>;
  updateOperationalRequirement?: Maybe<OperationalRequirement>;
  deleteOperationalRequirement?: Maybe<OperationalRequirement>;
};

export type MutationCreateUserArgs = {
  user: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars["ID"];
  user: UpdateUserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationCreatePoolArgs = {
  pool: CreatePoolInput;
};

export type MutationUpdatePoolArgs = {
  id: Scalars["ID"];
  pool: UpdatePoolInput;
};

export type MutationDeletePoolArgs = {
  id: Scalars["ID"];
};

export type MutationCreatePoolCandidateArgs = {
  poolCandidate: CreatePoolCandidateInput;
};

export type MutationUpdatePoolCandidateArgs = {
  id: Scalars["ID"];
  poolCandidate: UpdatePoolCandidateInput;
};

export type MutationDeletePoolCandidateArgs = {
  id: Scalars["ID"];
};

export type MutationCreateClassificationArgs = {
  classification: CreateClassificationInput;
};

export type MutationUpdateClassificationArgs = {
  id: Scalars["ID"];
  classification: UpdateClassificationInput;
};

export type MutationDeleteClassificationArgs = {
  id: Scalars["ID"];
};

export type MutationCreateCmoAssetArgs = {
  cmoAsset: CreateCmoAssetInput;
};

export type MutationUpdateCmoAssetArgs = {
  id: Scalars["ID"];
  cmoAsset: UpdateCmoAssetInput;
};

export type MutationDeleteCmoAssetArgs = {
  id: Scalars["ID"];
};

export type MutationCreateOperationalRequirementArgs = {
  operationalRequirement: CreateOperationalRequirementInput;
};

export type MutationUpdateOperationalRequirementArgs = {
  id: Scalars["ID"];
  operationalRequirement: UpdateOperationalRequirementInput;
};

export type MutationDeleteOperationalRequirementArgs = {
  id: Scalars["ID"];
};

/** e.g. Overtime as Required, Shift Work, Travel as Required, etc. */
export type OperationalRequirement = {
  __typename?: "OperationalRequirement";
  id: Scalars["ID"];
  key: Scalars["String"];
  name: LocalizedString;
  description?: Maybe<LocalizedString>;
};

export type OperationalRequirementBelongsToMany = {
  sync?: Maybe<Array<Scalars["ID"]>>;
};

export type Pool = {
  __typename?: "Pool";
  id: Scalars["ID"];
  owner?: Maybe<User>;
  name?: Maybe<LocalizedString>;
  description?: Maybe<LocalizedString>;
  classifications?: Maybe<Array<Maybe<Classification>>>;
  assetCriteria?: Maybe<Array<Maybe<CmoAsset>>>;
  essentialCriteria?: Maybe<Array<Maybe<CmoAsset>>>;
  operationalRequirements?: Maybe<Array<Maybe<OperationalRequirement>>>;
  poolCandidates?: Maybe<Array<Maybe<PoolCandidate>>>;
};

export type PoolBelongsTo = {
  connect: Scalars["ID"];
};

export type PoolCandidate = {
  __typename?: "PoolCandidate";
  id: Scalars["ID"];
  pool?: Maybe<Pool>;
  user?: Maybe<User>;
  cmoIdentifier?: Maybe<Scalars["ID"]>;
  expiryDate?: Maybe<Scalars["Date"]>;
  isWoman?: Maybe<Scalars["Boolean"]>;
  hasDisability?: Maybe<Scalars["Boolean"]>;
  isIndigenous?: Maybe<Scalars["Boolean"]>;
  isVisibleMinority?: Maybe<Scalars["Boolean"]>;
  hasDiploma?: Maybe<Scalars["Boolean"]>;
  languageAbility?: Maybe<LanguageAbility>;
  locationPreferences?: Maybe<Array<Maybe<WorkRegion>>>;
  acceptedOperationalRequirements?: Maybe<Array<Maybe<OperationalRequirement>>>;
  expectedSalary?: Maybe<Array<Maybe<SalaryRange>>>;
  expectedClassifications?: Maybe<Array<Maybe<Classification>>>;
  cmoAssets?: Maybe<Array<Maybe<CmoAsset>>>;
  status?: Maybe<PoolCandidateStatus>;
};

export type PoolCandidateHasMany = {
  create?: Maybe<Array<CreatePoolCandidateInput>>;
};

export enum PoolCandidateStatus {
  Available = "AVAILABLE",
  PlacedIndeterminate = "PLACED_INDETERMINATE",
  PlacedTerm = "PLACED_TERM",
  NoLongerInterested = "NO_LONGER_INTERESTED",
}

export type Query = {
  __typename?: "Query";
  users: Array<Maybe<User>>;
  user?: Maybe<User>;
  pools: Array<Maybe<Pool>>;
  pool?: Maybe<Pool>;
  poolCandidates: Array<Maybe<PoolCandidate>>;
  poolCandidate?: Maybe<PoolCandidate>;
  classifications: Array<Maybe<Classification>>;
  operationalRequirements: Array<Maybe<OperationalRequirement>>;
  cmoAssets: Array<Maybe<CmoAsset>>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryPoolArgs = {
  id: Scalars["ID"];
};

export type QueryPoolCandidateArgs = {
  id: Scalars["ID"];
};

export enum SalaryRange {
  "50_59K" = "_50_59K",
  "60_69K" = "_60_69K",
  "70_79K" = "_70_79K",
  "80_89K" = "_80_89K",
  "90_99K" = "_90_99K",
  "100KPlus" = "_100K_PLUS",
}

export type UpdateClassificationInput = {
  name?: Maybe<LocalizedStringInput>;
  group?: Maybe<Scalars["String"]>;
  minSalary?: Maybe<Scalars["Int"]>;
  maxSalary?: Maybe<Scalars["Int"]>;
};

export type UpdateCmoAssetInput = {
  key?: Maybe<Scalars["String"]>;
  name?: Maybe<LocalizedStringInput>;
  description?: Maybe<LocalizedStringInput>;
};

export type UpdateOperationalRequirementInput = {
  key?: Maybe<Scalars["String"]>;
  name?: Maybe<LocalizedStringInput>;
  description?: Maybe<LocalizedStringInput>;
};

export type UpdatePoolCandidateInput = {
  user?: Maybe<UpdatePoolCandidateUserBelongsTo>;
  cmoIdentifier?: Maybe<Scalars["ID"]>;
  expiryDate?: Maybe<Scalars["Date"]>;
  isWoman?: Maybe<Scalars["Boolean"]>;
  hasDisability?: Maybe<Scalars["Boolean"]>;
  isIndigenous?: Maybe<Scalars["Boolean"]>;
  isVisibleMinority?: Maybe<Scalars["Boolean"]>;
  hasDiploma?: Maybe<Scalars["Boolean"]>;
  languageAbility?: Maybe<LanguageAbility>;
  locationPreferences?: Maybe<Array<Maybe<WorkRegion>>>;
  acceptedOperationalRequirements?: Maybe<OperationalRequirementBelongsToMany>;
  expectedSalary?: Maybe<Array<Maybe<SalaryRange>>>;
  expectedClassifications?: Maybe<ClassificationBelongsToMany>;
  cmoAssets?: Maybe<CmoAssetBelongsToMany>;
  status?: Maybe<PoolCandidateStatus>;
};

/** When updating a PoolCandidate it is possible to update the related user, but not change which user it is related to. */
export type UpdatePoolCandidateUserBelongsTo = {
  update?: Maybe<UpdateUserInput>;
};

export type UpdatePoolInput = {
  owner?: Maybe<UserBelongsTo>;
  name?: Maybe<LocalizedStringInput>;
  description?: Maybe<LocalizedStringInput>;
  classifications?: Maybe<ClassificationBelongsToMany>;
  assetCriteria?: Maybe<CmoAssetBelongsToMany>;
  essentialCriteria?: Maybe<CmoAssetBelongsToMany>;
  operationalRequirements?: Maybe<OperationalRequirementBelongsToMany>;
};

/** When updating a User, all fields are optional, and email cannot be changed. */
export type UpdateUserInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  telephone?: Maybe<Scalars["PhoneNumber"]>;
  preferredLang?: Maybe<Language>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["Email"];
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  telephone?: Maybe<Scalars["PhoneNumber"]>;
  preferredLang?: Maybe<Language>;
  pools?: Maybe<Array<Maybe<Pool>>>;
  poolCandidates?: Maybe<Array<Maybe<PoolCandidate>>>;
};

export type UserBelongsTo = {
  create?: Maybe<CreateUserInput>;
  connect?: Maybe<Scalars["ID"]>;
  update?: Maybe<UpdateUserInput>;
};

export enum WorkRegion {
  Telework = "TELEWORK",
  NationalCapital = "NATIONAL_CAPITAL",
  Atlantic = "ATLANTIC",
  Quebec = "QUEBEC",
  Ontario = "ONTARIO",
  Prairie = "PRAIRIE",
  BritishColumbia = "BRITISH_COLUMBIA",
  North = "NORTH",
}

export type GetClassificationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetClassificationsQuery = { __typename?: "Query" } & {
  classifications: Array<
    Maybe<
      { __typename?: "Classification" } & Pick<
        Classification,
        "id" | "group" | "level" | "minSalary" | "maxSalary"
      > & {
          name?: Maybe<
            { __typename?: "LocalizedString" } & Pick<LocalizedString, "en">
          >;
        }
    >
  >;
};

export type GetCmoAssetsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCmoAssetsQuery = { __typename?: "Query" } & {
  cmoAssets: Array<
    Maybe<
      { __typename?: "CmoAsset" } & Pick<CmoAsset, "id" | "key"> & {
          name: { __typename?: "LocalizedString" } & Pick<
            LocalizedString,
            "en" | "fr"
          >;
          description?: Maybe<
            { __typename?: "LocalizedString" } & Pick<
              LocalizedString,
              "en" | "fr"
            >
          >;
        }
    >
  >;
};

export type GetOperationalRequirementsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetOperationalRequirementsQuery = { __typename?: "Query" } & {
  operationalRequirements: Array<
    Maybe<
      { __typename?: "OperationalRequirement" } & Pick<
        OperationalRequirement,
        "id" | "key"
      > & {
          name: { __typename?: "LocalizedString" } & Pick<
            LocalizedString,
            "en" | "fr"
          >;
          description?: Maybe<
            { __typename?: "LocalizedString" } & Pick<
              LocalizedString,
              "en" | "fr"
            >
          >;
        }
    >
  >;
};

export type GetPoolCandidatesQueryVariables = Exact<{ [key: string]: never }>;

export type GetPoolCandidatesQuery = { __typename?: "Query" } & {
  poolCandidates: Array<
    Maybe<
      { __typename?: "PoolCandidate" } & Pick<
        PoolCandidate,
        | "id"
        | "cmoIdentifier"
        | "expiryDate"
        | "isWoman"
        | "hasDisability"
        | "isIndigenous"
        | "isVisibleMinority"
        | "hasDiploma"
        | "languageAbility"
        | "locationPreferences"
        | "expectedSalary"
        | "status"
      > & {
          pool?: Maybe<
            { __typename?: "Pool" } & Pick<Pool, "id"> & {
                name?: Maybe<
                  { __typename?: "LocalizedString" } & Pick<
                    LocalizedString,
                    "en" | "fr"
                  >
                >;
                classifications?: Maybe<
                  Array<
                    Maybe<
                      { __typename?: "Classification" } & Pick<
                        Classification,
                        "id" | "group" | "level"
                      > & {
                          name?: Maybe<
                            { __typename?: "LocalizedString" } & Pick<
                              LocalizedString,
                              "en" | "fr"
                            >
                          >;
                        }
                    >
                  >
                >;
              }
          >;
          user?: Maybe<
            { __typename?: "User" } & Pick<
              User,
              "id" | "firstName" | "lastName" | "email"
            >
          >;
          acceptedOperationalRequirements?: Maybe<
            Array<
              Maybe<
                { __typename?: "OperationalRequirement" } & Pick<
                  OperationalRequirement,
                  "id"
                > & {
                    name: { __typename?: "LocalizedString" } & Pick<
                      LocalizedString,
                      "en" | "fr"
                    >;
                  }
              >
            >
          >;
          expectedClassifications?: Maybe<
            Array<
              Maybe<
                { __typename?: "Classification" } & Pick<
                  Classification,
                  "id" | "group" | "level"
                > & {
                    name?: Maybe<
                      { __typename?: "LocalizedString" } & Pick<
                        LocalizedString,
                        "en" | "fr"
                      >
                    >;
                  }
              >
            >
          >;
          cmoAssets?: Maybe<
            Array<
              Maybe<
                { __typename?: "CmoAsset" } & Pick<CmoAsset, "id"> & {
                    name: { __typename?: "LocalizedString" } & Pick<
                      LocalizedString,
                      "en" | "fr"
                    >;
                  }
              >
            >
          >;
        }
    >
  >;
};

export type GetPoolCandidatesForFormQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetPoolCandidatesForFormQuery = { __typename?: "Query" } & {
  poolCandidates: Array<
    Maybe<
      { __typename?: "PoolCandidate" } & Pick<
        PoolCandidate,
        | "id"
        | "cmoIdentifier"
        | "expiryDate"
        | "isWoman"
        | "hasDisability"
        | "isIndigenous"
        | "isVisibleMinority"
        | "hasDiploma"
        | "languageAbility"
        | "locationPreferences"
        | "expectedSalary"
        | "status"
      > & {
          pool?: Maybe<
            { __typename?: "Pool" } & Pick<Pool, "id"> & {
                name?: Maybe<
                  { __typename?: "LocalizedString" } & Pick<
                    LocalizedString,
                    "en" | "fr"
                  >
                >;
                classifications?: Maybe<
                  Array<
                    Maybe<
                      { __typename?: "Classification" } & Pick<
                        Classification,
                        "id" | "group" | "level"
                      > & {
                          name?: Maybe<
                            { __typename?: "LocalizedString" } & Pick<
                              LocalizedString,
                              "en" | "fr"
                            >
                          >;
                        }
                    >
                  >
                >;
              }
          >;
          user?: Maybe<
            { __typename?: "User" } & Pick<
              User,
              "id" | "firstName" | "lastName" | "email"
            >
          >;
          acceptedOperationalRequirements?: Maybe<
            Array<
              Maybe<
                { __typename?: "OperationalRequirement" } & Pick<
                  OperationalRequirement,
                  "id"
                > & {
                    name: { __typename?: "LocalizedString" } & Pick<
                      LocalizedString,
                      "en" | "fr"
                    >;
                  }
              >
            >
          >;
          expectedClassifications?: Maybe<
            Array<
              Maybe<
                { __typename?: "Classification" } & Pick<
                  Classification,
                  "id" | "group" | "level"
                > & {
                    name?: Maybe<
                      { __typename?: "LocalizedString" } & Pick<
                        LocalizedString,
                        "en" | "fr"
                      >
                    >;
                  }
              >
            >
          >;
          cmoAssets?: Maybe<
            Array<
              Maybe<
                { __typename?: "CmoAsset" } & Pick<CmoAsset, "id"> & {
                    name: { __typename?: "LocalizedString" } & Pick<
                      LocalizedString,
                      "en" | "fr"
                    >;
                  }
              >
            >
          >;
        }
    >
  >;
  operationalRequirements: Array<
    Maybe<
      { __typename?: "OperationalRequirement" } & Pick<
        OperationalRequirement,
        "id"
      > & {
          name: { __typename?: "LocalizedString" } & Pick<
            LocalizedString,
            "en" | "fr"
          >;
        }
    >
  >;
};

export type CreatePoolCandidateMutationVariables = Exact<{
  poolCandidate: CreatePoolCandidateInput;
}>;

export type CreatePoolCandidateMutation = { __typename?: "Mutation" } & {
  createPoolCandidate?: Maybe<
    { __typename?: "PoolCandidate" } & Pick<
      PoolCandidate,
      | "cmoIdentifier"
      | "expiryDate"
      | "isWoman"
      | "hasDisability"
      | "isIndigenous"
      | "isVisibleMinority"
      | "hasDiploma"
      | "languageAbility"
      | "locationPreferences"
      | "expectedSalary"
      | "status"
    > & {
        pool?: Maybe<{ __typename?: "Pool" } & Pick<Pool, "id">>;
        user?: Maybe<{ __typename?: "User" } & Pick<User, "id">>;
        acceptedOperationalRequirements?: Maybe<
          Array<
            Maybe<
              { __typename?: "OperationalRequirement" } & Pick<
                OperationalRequirement,
                "id"
              >
            >
          >
        >;
        expectedClassifications?: Maybe<
          Array<
            Maybe<
              { __typename?: "Classification" } & Pick<Classification, "id">
            >
          >
        >;
        cmoAssets?: Maybe<
          Array<Maybe<{ __typename?: "CmoAsset" } & Pick<CmoAsset, "id">>>
        >;
      }
  >;
};

export type UpdatePoolCandidateMutationVariables = Exact<{
  id: Scalars["ID"];
  poolCandidate: UpdatePoolCandidateInput;
}>;

export type UpdatePoolCandidateMutation = { __typename?: "Mutation" } & {
  updatePoolCandidate?: Maybe<
    { __typename?: "PoolCandidate" } & Pick<
      PoolCandidate,
      | "cmoIdentifier"
      | "expiryDate"
      | "isWoman"
      | "hasDisability"
      | "isIndigenous"
      | "isVisibleMinority"
      | "hasDiploma"
      | "languageAbility"
      | "locationPreferences"
      | "expectedSalary"
      | "status"
    > & {
        acceptedOperationalRequirements?: Maybe<
          Array<
            Maybe<
              { __typename?: "OperationalRequirement" } & Pick<
                OperationalRequirement,
                "id"
              > & {
                  name: { __typename?: "LocalizedString" } & Pick<
                    LocalizedString,
                    "en" | "fr"
                  >;
                }
            >
          >
        >;
        expectedClassifications?: Maybe<
          Array<
            Maybe<
              { __typename?: "Classification" } & Pick<
                Classification,
                "id" | "group" | "level"
              >
            >
          >
        >;
        cmoAssets?: Maybe<
          Array<
            Maybe<
              { __typename?: "CmoAsset" } & Pick<CmoAsset, "id"> & {
                  name: { __typename?: "LocalizedString" } & Pick<
                    LocalizedString,
                    "en" | "fr"
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type AllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type AllUsersQuery = { __typename?: "Query" } & {
  users: Array<
    Maybe<
      { __typename?: "User" } & Pick<
        User,
        | "id"
        | "email"
        | "firstName"
        | "lastName"
        | "telephone"
        | "preferredLang"
      >
    >
  >;
};

export type UserQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UserQuery = { __typename?: "Query" } & {
  user?: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "email" | "firstName" | "lastName" | "telephone" | "preferredLang"
    >
  >;
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars["ID"];
  user: UpdateUserInput;
}>;

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser?: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "firstName" | "lastName" | "email" | "telephone" | "preferredLang"
    >
  >;
};

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser?: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "firstName" | "lastName" | "email" | "telephone" | "preferredLang"
    >
  >;
};

export const GetClassificationsDocument = gql`
  query GetClassifications {
    classifications {
      id
      name {
        en
      }
      group
      level
      minSalary
      maxSalary
    }
  }
`;

export function useGetClassificationsQuery(
  options: Omit<
    Urql.UseQueryArgs<GetClassificationsQueryVariables>,
    "query"
  > = {},
) {
  return Urql.useQuery<GetClassificationsQuery>({
    query: GetClassificationsDocument,
    ...options,
  });
}
export const GetCmoAssetsDocument = gql`
  query GetCmoAssets {
    cmoAssets {
      id
      key
      name {
        en
        fr
      }
      description {
        en
        fr
      }
    }
  }
`;

export function useGetCmoAssetsQuery(
  options: Omit<Urql.UseQueryArgs<GetCmoAssetsQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<GetCmoAssetsQuery>({
    query: GetCmoAssetsDocument,
    ...options,
  });
}
export const GetOperationalRequirementsDocument = gql`
  query GetOperationalRequirements {
    operationalRequirements {
      id
      key
      name {
        en
        fr
      }
      description {
        en
        fr
      }
    }
  }
`;

export function useGetOperationalRequirementsQuery(
  options: Omit<
    Urql.UseQueryArgs<GetOperationalRequirementsQueryVariables>,
    "query"
  > = {},
) {
  return Urql.useQuery<GetOperationalRequirementsQuery>({
    query: GetOperationalRequirementsDocument,
    ...options,
  });
}
export const GetPoolCandidatesDocument = gql`
  query GetPoolCandidates {
    poolCandidates {
      id
      pool {
        id
        name {
          en
          fr
        }
        classifications {
          id
          name {
            en
            fr
          }
          group
          level
        }
      }
      user {
        id
        firstName
        lastName
        email
      }
      cmoIdentifier
      expiryDate
      isWoman
      hasDisability
      isIndigenous
      isVisibleMinority
      hasDiploma
      languageAbility
      locationPreferences
      acceptedOperationalRequirements {
        id
        name {
          en
          fr
        }
      }
      expectedSalary
      expectedClassifications {
        id
        name {
          en
          fr
        }
        group
        level
      }
      cmoAssets {
        id
        name {
          en
          fr
        }
      }
      status
    }
  }
`;

export function useGetPoolCandidatesQuery(
  options: Omit<
    Urql.UseQueryArgs<GetPoolCandidatesQueryVariables>,
    "query"
  > = {},
) {
  return Urql.useQuery<GetPoolCandidatesQuery>({
    query: GetPoolCandidatesDocument,
    ...options,
  });
}
export const GetPoolCandidatesForFormDocument = gql`
  query GetPoolCandidatesForForm {
    poolCandidates {
      id
      pool {
        id
        name {
          en
          fr
        }
        classifications {
          id
          name {
            en
            fr
          }
          group
          level
        }
      }
      user {
        id
        firstName
        lastName
        email
      }
      cmoIdentifier
      expiryDate
      isWoman
      hasDisability
      isIndigenous
      isVisibleMinority
      hasDiploma
      languageAbility
      locationPreferences
      acceptedOperationalRequirements {
        id
        name {
          en
          fr
        }
      }
      expectedSalary
      expectedClassifications {
        id
        name {
          en
          fr
        }
        group
        level
      }
      cmoAssets {
        id
        name {
          en
          fr
        }
      }
      status
    }
    operationalRequirements {
      id
      name {
        en
        fr
      }
    }
  }
`;

export function useGetPoolCandidatesForFormQuery(
  options: Omit<
    Urql.UseQueryArgs<GetPoolCandidatesForFormQueryVariables>,
    "query"
  > = {},
) {
  return Urql.useQuery<GetPoolCandidatesForFormQuery>({
    query: GetPoolCandidatesForFormDocument,
    ...options,
  });
}
export const CreatePoolCandidateDocument = gql`
  mutation createPoolCandidate($poolCandidate: CreatePoolCandidateInput!) {
    createPoolCandidate(poolCandidate: $poolCandidate) {
      pool {
        id
      }
      user {
        id
      }
      cmoIdentifier
      expiryDate
      isWoman
      hasDisability
      isIndigenous
      isVisibleMinority
      hasDiploma
      languageAbility
      locationPreferences
      acceptedOperationalRequirements {
        id
      }
      expectedSalary
      expectedClassifications {
        id
      }
      cmoAssets {
        id
      }
      status
    }
  }
`;

export function useCreatePoolCandidateMutation() {
  return Urql.useMutation<
    CreatePoolCandidateMutation,
    CreatePoolCandidateMutationVariables
  >(CreatePoolCandidateDocument);
}
export const UpdatePoolCandidateDocument = gql`
  mutation updatePoolCandidate(
    $id: ID!
    $poolCandidate: UpdatePoolCandidateInput!
  ) {
    updatePoolCandidate(id: $id, poolCandidate: $poolCandidate) {
      cmoIdentifier
      expiryDate
      isWoman
      hasDisability
      isIndigenous
      isVisibleMinority
      hasDiploma
      languageAbility
      locationPreferences
      acceptedOperationalRequirements {
        id
        name {
          en
          fr
        }
      }
      expectedSalary
      expectedClassifications {
        id
        group
        level
      }
      cmoAssets {
        id
        name {
          en
          fr
        }
      }
      status
    }
  }
`;

export function useUpdatePoolCandidateMutation() {
  return Urql.useMutation<
    UpdatePoolCandidateMutation,
    UpdatePoolCandidateMutationVariables
  >(UpdatePoolCandidateDocument);
}
export const AllUsersDocument = gql`
  query AllUsers {
    users {
      id
      email
      firstName
      lastName
      telephone
      preferredLang
    }
  }
`;

export function useAllUsersQuery(
  options: Omit<Urql.UseQueryArgs<AllUsersQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<AllUsersQuery>({ query: AllUsersDocument, ...options });
}
export const UserDocument = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      telephone
      preferredLang
    }
  }
`;

export function useUserQuery(
  options: Omit<Urql.UseQueryArgs<UserQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      id
      firstName
      lastName
      email
      telephone
      preferredLang
    }
  }
`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
  );
}
export const CreateUserDocument = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      firstName
      lastName
      email
      telephone
      preferredLang
    }
  }
`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
  );
}
