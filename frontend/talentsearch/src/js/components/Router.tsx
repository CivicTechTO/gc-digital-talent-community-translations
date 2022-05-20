import React from "react";
import { useIntl } from "react-intl";
import { Routes } from "universal-router";
import { RouterResult } from "@common/helpers/router";
import Toast from "@common/components/Toast";
import { checkFeatureFlag } from "@common/helpers/runtimeVariable";
import ClientProvider from "./ClientProvider";
import PageContainer, { MenuLink } from "./PageContainer";
import SearchPage from "./search/SearchPage";
import {
  useTalentSearchRoutes,
  TalentSearchRoutes,
} from "../talentSearchRoutes";
import {
  ApplicantProfileRoutes,
  useApplicantProfileRoutes,
} from "../applicantProfileRoutes";
import RequestPage from "./request/RequestPage";
import WorkLocationPreferenceApi from "./workLocationPreferenceForm/WorkLocationPreferenceForm";
import { ProfilePage } from "./profile/ProfilePage/ProfilePage";
import ExperienceFormContainer from "./experienceForm/ExperienceForm";
import { ExperienceType } from "./experienceForm/types";
import WorkPreferencesApi from "./workPreferencesForm/WorkPreferencesForm";
import { GovInfoFormContainer } from "./GovernmentInfoForm/GovernmentInfoForm";
import LanguageInformationFormContainer from "./languageInformationForm/LanguageInformationForm";
import AboutMeFormContainer from "./aboutMeForm/AboutMeForm";
import DiversityEquityInclusionFormApi from "./diversityEquityInclusion/DiversityEquityInclusionForm";
import { ExperienceAndSkillsRouterApi } from "./applicantProfile/ExperienceAndSkills";

const talentRoutes = (
  talentPaths: TalentSearchRoutes,
): Routes<RouterResult> => [
  {
    path: talentPaths.home(),
    action: () => ({
      component: <div />,
      redirect: talentPaths.search(),
    }),
  },
  {
    path: talentPaths.search(),
    action: () => ({
      component: <SearchPage />,
    }),
  },
  {
    path: talentPaths.request(),
    action: () => ({
      component: <RequestPage />,
    }),
  },
];

const profileRoutes = (
  profilePaths: ApplicantProfileRoutes,
): Routes<RouterResult> => [
  {
    path: profilePaths.home(),
    action: () => ({
      component: <ProfilePage />,
    }),
  },
  {
    path: profilePaths.governmentInformation(),
    action: () => ({
      component: <GovInfoFormContainer />,
    }),
  },
  {
    path: profilePaths.languageInformation(),
    action: () => ({
      component: <LanguageInformationFormContainer />,
    }),
  },
  {
    path: profilePaths.workLocation(),
    action: () => ({
      component: <WorkLocationPreferenceApi />,
    }),
  },
  {
    path: `${profilePaths.skillsAndExperiences()}/:type/create`,
    action: (context) => {
      const experienceType = context.params.type as ExperienceType;
      return {
        component: <ExperienceFormContainer experienceType={experienceType} />,
      };
    },
  },
  {
    path: `${profilePaths.skillsAndExperiences()}/:type/:id/edit`,
    action: (context) => {
      const experienceType = context.params.type as ExperienceType;
      const experienceId = context.params.id as string;
      return {
        component: (
          <ExperienceFormContainer
            experienceType={experienceType}
            experienceId={experienceId}
            edit
          />
        ),
      };
    },
  },
  {
    path: profilePaths.workPreferences(),
    action: () => ({
      component: <WorkPreferencesApi />,
    }),
  },
  {
    path: profilePaths.aboutMe(),
    action: () => ({
      component: <AboutMeFormContainer />,
    }),
  },
  {
    path: profilePaths.diversityEquityInclusion(),
    action: () => ({
      component: <DiversityEquityInclusionFormApi />,
    }),
  },
  {
    path: profilePaths.skillsAndExperiences(),
    action: () => ({
      component: <ExperienceAndSkillsRouterApi />,
    }),
  },
];

export const Router: React.FC = () => {
  const intl = useIntl();
  const talentPaths = useTalentSearchRoutes();
  const profilePaths = useApplicantProfileRoutes();

  const menuItems = [
    <MenuLink
      key="search"
      href={talentPaths.search()}
      text={intl.formatMessage({
        defaultMessage: "Search",
        description: "Label displayed on the Search menu item.",
      })}
    />,
    <MenuLink
      key="request"
      href={talentPaths.request()}
      text={intl.formatMessage({
        defaultMessage: "Request",
        description: "Label displayed on the Request menu item.",
      })}
    />,
  ];
  return (
    <ClientProvider>
      <PageContainer
        menuItems={menuItems}
        contentRoutes={[
          ...talentRoutes(talentPaths),
          ...(checkFeatureFlag("FEATURE_APPLICANTPROFILE")
            ? profileRoutes(profilePaths)
            : []),
        ]}
      />
      <Toast />
    </ClientProvider>
  );
};

export default Router;
