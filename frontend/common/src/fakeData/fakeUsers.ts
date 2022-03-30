import faker from "faker";
import {
  User,
  Language,
  ProvinceOrTerritory,
  LanguageAbility,
  BilingualEvaluation,
  EvaluatedLanguageAbility,
  EstimatedLanguageAbility,
  Classification,
  OperationalRequirement,
  JobLookingStatus,
  Pool,
  PoolCandidate,
  WorkRegion,
  SalaryRange,
  CmoAsset,
  AwardExperience,
  CommunityExperience,
  EducationExperience,
  PersonalExperience,
  WorkExperience,
} from "../api/generated";
import fakeClassifications from "./fakeClassifications";
import fakeCmoAssets from "./fakeCmoAssets";
import fakeOperationalRequirements from "./fakeOperationalRequirements";

const generateUser = (
  classifications: Classification[], // all classifications
  operationalRequirements: OperationalRequirement[], // all operational requirements
  cmoAssets: CmoAsset[], // all CmoAssets

  awardExperiences: AwardExperience[], // Experiences belonging to this user
  communityExperiences: CommunityExperience[], // Experiences belonging to this user
  educationExperiences: EducationExperience[], // Experiences belonging to this user
  personalExperiences: PersonalExperience[], // Experiences belonging to this user
  workExperiences: WorkExperience[], // Experiences belonging to this user

  poolCandidates: PoolCandidate[] = [], // poolCandidates associating this user with a pool
  pools: Pool[] = [], // pools owned by this user
): User => {
  faker.setLocale("en");

  return {
    id: faker.datatype.uuid(),

    // Personal Info
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    telephone: faker.helpers.replaceSymbols("+###########"),
    preferredLang: faker.random.arrayElement(Object.values(Language)),
    currentProvince: faker.random.arrayElement(
      Object.values(ProvinceOrTerritory),
    ),
    currentCity: faker.address.city(),

    // Language
    languageAbility: faker.random.arrayElement(Object.values(LanguageAbility)),
    lookingForEnglish: faker.datatype.boolean(),
    lookingForFrench: faker.datatype.boolean(),
    lookingForBilingual: faker.datatype.boolean(),
    bilingualEvaluation: faker.random.arrayElement(
      Object.values(BilingualEvaluation),
    ),
    comprehensionLevel: faker.random.arrayElement(
      Object.values(EvaluatedLanguageAbility),
    ),
    writtenLevel: faker.random.arrayElement(
      Object.values(EvaluatedLanguageAbility),
    ),
    verbalLevel: faker.random.arrayElement(
      Object.values(EvaluatedLanguageAbility),
    ),
    estimatedLanguageAbility: faker.random.arrayElement(
      Object.values(EstimatedLanguageAbility),
    ),

    // Gov info
    isGovEmployee: faker.datatype.boolean(),
    interestedInLaterOrSecondment: faker.datatype.boolean(),
    currentClassification: faker.random.arrayElement(classifications),

    // Employment Equity
    isWoman: faker.datatype.boolean(),
    hasDisability: faker.datatype.boolean(),
    isIndigenous: faker.datatype.boolean(),
    isVisibleMinority: faker.datatype.boolean(),

    // Applicant info
    jobLookingStatus: faker.random.arrayElement(
      Object.values(JobLookingStatus),
    ),
    hasDiploma: faker.datatype.boolean(),
    locationPreferences: faker.random.arrayElements(Object.values(WorkRegion)),
    locationExemptions: faker.address.city(),
    acceptedOperationalRequirements: faker.random.arrayElements(
      operationalRequirements,
    ),
    expectedSalary: faker.random.arrayElements(Object.values(SalaryRange)),
    expectedClassifications: faker.random.arrayElements(classifications),
    wouldAcceptTemporary: faker.datatype.boolean(),
    cmoAssets: faker.random.arrayElements(cmoAssets),

    poolCandidates,

    experiences: [
      ...awardExperiences,
      ...communityExperiences,
      ...educationExperiences,
      ...personalExperiences,
      ...workExperiences,
    ],
    awardExperiences,
    communityExperiences,
    educationExperiences,
    personalExperiences,
    workExperiences,

    pools,
  };
};

// Default generator will not include any experiences, poolCandidates or pools
export const defaultGenerator = (numToGenerate = 20): User[] => {
  const classifications = fakeClassifications();
  const operationalRequirements = fakeOperationalRequirements();
  const cmoAssets = fakeCmoAssets();

  const awardExperiences: AwardExperience[] = [];
  const communityExperiences: CommunityExperience[] = [];
  const educationExperiences: EducationExperience[] = [];
  const personalExperiences: PersonalExperience[] = [];
  const workExperiences: WorkExperience[] = [];

  faker.seed(0); // repeatable results
  return [...Array(numToGenerate)].map(() =>
    generateUser(
      classifications,
      operationalRequirements,
      cmoAssets,
      awardExperiences,
      communityExperiences,
      educationExperiences,
      personalExperiences,
      workExperiences,
    ),
  );
};

export default defaultGenerator;
