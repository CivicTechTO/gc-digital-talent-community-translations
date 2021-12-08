import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { fakeDepartments } from "@common/fakeData";
import { RequestForm } from "../components/request/CreateRequest";
import {
  CreatePoolCandidateSearchRequestInput,
  PoolCandidateFilter,
  WorkRegion,
} from "../api/generated";

const stories = storiesOf("Search Request Form", module);

stories.add("Search Request Form", () => {
  const poolCandidateFilter: PoolCandidateFilter = {
    id: "9ef184ad-1752-411e-a022-7f7989f6bf27",
    classifications: [
      {
        id: "90689420-553d-4a3b-999a-fb94b1baaa69",
        group: "CS",
        level: 4,
      },
      {
        id: "bcfa88b3-ed22-4879-8642-e7dd003e91b4",
        group: "CS",
        level: 5,
      },
      {
        id: "7b0d9293-e811-413c-b0df-346e55f3fdd0",
        group: "EC",
        level: 1,
      },
    ],
    cmoAssets: [
      {
        id: "6605d898-bd08-4b30-bb16-d56e299b475b",
        key: "app_dev",
        name: {
          en: "Application Development",
          fr: "Développement d'applications",
        },
      },
      {
        id: "f506e278-e4af-4ab5-b8d6-8f38c1c1591a",
        key: "app_testing",
        name: {
          en: "Application Testing / Quality Assurance",
          fr: "Test d'application / Assurance qualité",
        },
      },
      {
        id: "6cf47865-5079-4584-87d3-395b1825c5d4",
        key: "cybersecurity",
        name: {
          en: "Cybersecurity / Information Security / IT Security",
          fr: "Cybersécurité / Sécurité de l'information / Sécurité informatique",
        },
      },
      {
        id: "1225da7c-c8ff-46c0-be1c-df97f8a4f253",
        key: "data_science",
        name: {
          en: "Data Science / Analysis",
          fr: "Science des données / Analyse",
        },
      },
    ],
    hasDiploma: false,
    hasDisability: false,
    isIndigenous: false,
    isVisibleMinority: false,
    isWoman: false,
    languageAbility: null,
    operationalRequirements: [
      {
        id: "f92cf3d9-f283-4776-bb93-27b067ad2008",
        key: "drivers_license",
        name: {
          en: "Driver's license",
          fr: "Permis de conduire",
        },
      },
      {
        id: "dba77b57-6727-4321-af8b-1d5af2ec59a8",
        key: "on_call",
        name: {
          en: "24/7 on-call",
          fr: "Garde 24/7",
        },
      },
    ],
    workRegions: [WorkRegion.Ontario, WorkRegion.Quebec],
    pools: [
      {
        id: "acf045c9-6daf-4a59-aeb3-ab62acb0418e",
      },
    ],
  };
  return (
    <RequestForm
      departments={fakeDepartments()}
      poolCandidateFilter={poolCandidateFilter}
      candidateCount={10}
      handleCreatePoolCandidateSearchRequest={async (
        data: CreatePoolCandidateSearchRequestInput,
      ) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Create Pool Candidate Search Request")(data);
        return null;
      }}
    />
  );
});
