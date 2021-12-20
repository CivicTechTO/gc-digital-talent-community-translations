import { defineMessages, MessageDescriptor } from "react-intl";
import {
  Language,
  LanguageAbility,
  PoolCandidateStatus,
  SalaryRange,
  WorkRegion,
  PoolCandidateSearchStatus,
} from "../api/generated";
import { getOrThrowError } from "../helpers/util";

export const salaryRanges = {
  [SalaryRange["50_59K"]]: "$50,000 - $59,000",
  [SalaryRange["60_69K"]]: "$60,000 - $69,000",
  [SalaryRange["70_79K"]]: "$70,000 - $79,000",
  [SalaryRange["80_89K"]]: "$80,000 - $89,000",
  [SalaryRange["90_99K"]]: "$90,000 - $99,000",
  [SalaryRange["100KPlus"]]: "$100,000 - plus",
};

export const getSalaryRange = (salaryId: string | number): string =>
  getOrThrowError(salaryRanges, salaryId, `Invalid Salary Range '${salaryId}'`);

export const languages = defineMessages({
  [Language.En]: {
    defaultMessage: "English",
  },
  [Language.Fr]: {
    defaultMessage: "French",
  },
});

export const getLanguage = (languageId: string | number): MessageDescriptor =>
  getOrThrowError(languages, languageId, `Invalid Language '${languageId}'`);

export const educationRequirements = defineMessages({
  hasDiploma: {
    id: "hasDiploma",
    defaultMessage: "Required diploma from post-secondary institution",
  },
  doesNotHaveDiploma: {
    id: "doesNotHaveDiploma",
    defaultMessage: "Can accept a combination of work experience and education",
  },
});

export const getEducationRequirement = (
  educationRequirementId: string | number,
): MessageDescriptor =>
  getOrThrowError(
    educationRequirements,
    educationRequirementId,
    `Invalid Education Requirement '${educationRequirementId}'`,
  );

export const languageAbilities = defineMessages({
  [LanguageAbility.English]: {
    defaultMessage: "English only",
  },
  [LanguageAbility.French]: {
    defaultMessage: "French only",
  },
  [LanguageAbility.Bilingual]: {
    defaultMessage: "Bilingual, English, and French",
  },
});

export const getLanguageAbility = (
  languageAbilityId: string | number,
): MessageDescriptor =>
  getOrThrowError(
    languageAbilities,
    languageAbilityId,
    `Invalid Language Ability '${languageAbilityId}'`,
  );

export const workRegions = defineMessages({
  [WorkRegion.Atlantic]: {
    defaultMessage: "Atlantic",
  },
  [WorkRegion.BritishColumbia]: {
    defaultMessage: "British Columbia",
  },
  [WorkRegion.NationalCapital]: {
    defaultMessage: "National Capital",
  },
  [WorkRegion.North]: {
    defaultMessage: "North",
  },
  [WorkRegion.Ontario]: {
    defaultMessage: "Ontario",
  },
  [WorkRegion.Prairie]: {
    defaultMessage: "Prairie",
  },
  [WorkRegion.Quebec]: {
    defaultMessage: "Quebec",
  },
  [WorkRegion.Telework]: {
    defaultMessage: "Telework",
  },
});

export const getWorkRegion = (
  workRegionId: string | number,
): MessageDescriptor =>
  getOrThrowError(
    workRegions,
    workRegionId,
    `Invalid Work Region '${workRegionId}'`,
  );

export const poolCandidateStatuses = defineMessages({
  [PoolCandidateStatus.Available]: {
    defaultMessage: "Available",
  },
  [PoolCandidateStatus.NoLongerInterested]: {
    defaultMessage: "No Longer Interested",
  },
  [PoolCandidateStatus.PlacedIndeterminate]: {
    defaultMessage: "Placed Indeterminate",
  },
  [PoolCandidateStatus.PlacedTerm]: {
    defaultMessage: "Placed Term",
  },
});

export const getPoolCandidateStatus = (
  poolCandidateStatusId: string | number,
): MessageDescriptor =>
  getOrThrowError(
    poolCandidateStatuses,
    poolCandidateStatusId,
    `Invalid Pool Candidate Status '${poolCandidateStatusId}'`,
  );

export const poolCandidateSearchStatuses = defineMessages({
  [PoolCandidateSearchStatus.Done]: {
    defaultMessage: "Done",
  },
  [PoolCandidateSearchStatus.Pending]: {
    defaultMessage: "Pending",
  },
});

export const getPoolCandidateSearchStatus = (
  poolCandidateSearchStatusId: string | number,
): MessageDescriptor =>
  getOrThrowError(
    poolCandidateSearchStatuses,
    poolCandidateSearchStatusId,
    `Invalid Pool Candidate Search Status '${poolCandidateSearchStatusId}'`,
  );
