import React from "react";
import { defineMessages, useIntl } from "react-intl";
import { Routes } from "universal-router";
import { Link, RouterResult } from "../helpers/router";
import { CreateClassification } from "./classification/CreateClassification";
import { UpdateClassification } from "./classification/UpdateClassification";

import { ClassificationTableApi } from "./classification/ClassificationTable";
import ClientProvider from "./ClientProvider";
import CmoAssetPage from "./CmoAssetPage";
import { CreateCmoAsset } from "./cmoAssets/CreateCmoAsset";
import { UpdateCmoAsset } from "./cmoAssets/UpdateCmoAsset";
import { CreateUser } from "./CreateUser";
import { Dashboard, MenuHeading, MenuLink } from "./dashboard/Dashboard";
import ErrorContainer from "./ErrorContainer";
import OperationalRequirementPage from "./OperationalRequirementPage";
import { CreateOperationalRequirement } from "./operationalRequirements/CreateOperationalRequirement";
import { UpdateOperationalRequirement } from "./operationalRequirements/UpdateOperationalRequirement";
import { CreatePoolCandidate } from "./poolCandidate/CreatePoolCandidate";
import { UpdatePoolCandidate } from "./poolCandidate/UpdatePoolCandidate";
import PoolCandidatePage from "./PoolCandidatePage";
import { UpdateUser } from "./UpdateUser";
import UserPage from "./UserPage";
import PoolPage from "./pool/PoolPage";
import { CreatePool } from "./pool/CreatePool";
import { UpdatePool } from "./pool/UpdatePool";

import { useGetPoolsQuery } from "../api/generated";
import { getLocale } from "../helpers/localize";

const messages = defineMessages({
  menuAdminTools: {
    id: "poolDashboard.menu.adminToolsLabel",
    defaultMessage: "Admin Tools",
    description: "Label displayed on the Admin Tools menu item.",
  },
  menuUsers: {
    id: "poolDashboard.menu.usersLabel",
    defaultMessage: "Users",
    description: "Label displayed on the Users menu item.",
  },
  menuClassifications: {
    id: "poolDashboard.menu.classificationsLabel",
    defaultMessage: "Classifications",
    description: "Label displayed on the Classifications menu item.",
  },
  menuCmoAssets: {
    id: "poolDashboard.menu.cmoAssetsLabel",
    defaultMessage: "CMO Assets",
    description: "Label displayed on the CMO Assets menu item.",
  },
  menuOperationalRequirements: {
    id: "poolDashboard.menu.operationalRequirementsLabel",
    defaultMessage: "Operational Requirements",
    description: "Label displayed on the Operational Requirements menu item.",
  },
  menuPoolCandidates: {
    id: "poolDashboard.menu.poolCandidatesLabel",
    defaultMessage: "Pool Candidates",
    description: "Label displayed on the Pool Candidates menu item.",
  },
  menuPools: {
    id: "poolDashboard.menu.poolsLabel",
    defaultMessage: "Pools",
    description: "Label displayed on the Pools menu item.",
  },
});

const routes: Routes<RouterResult> = [
  {
    path: "/users",
    action: () => ({
      component: <UserPage />,
    }),
  },
  {
    path: "/users/create",
    action: () => ({
      component: <CreateUser />,
    }),
  },
  {
    path: "/users/:id/edit",
    action: ({ params }) => ({
      component: <UpdateUser userId={params.id as string} />,
    }),
  },
  {
    path: "/classifications",
    action: () => ({
      component: (
        <div>
          <Link href="/classifications/create" title="">
            Create Classification
          </Link>
          <ClassificationTableApi />
        </div>
      ),
    }),
  },
  {
    path: "/classifications/create",
    action: () => ({
      component: <CreateClassification />,
    }),
  },
  {
    path: "/classifications/:id/edit",
    action: ({ params }) => ({
      component: (
        <UpdateClassification classificationId={params.id as string} />
      ),
    }),
  },
  {
    path: "/cmo-assets",
    action: () => ({
      component: <CmoAssetPage />,
    }),
  },
  {
    path: "/cmo-assets/create",
    action: () => ({
      component: <CreateCmoAsset />,
    }),
  },
  {
    path: "/cmo-assets/:id/edit",
    action: ({ params }) => ({
      component: <UpdateCmoAsset cmoAssetId={params.id as string} />,
    }),
  },
  {
    path: "/operational-requirements",
    action: () => ({
      component: <OperationalRequirementPage />,
    }),
  },
  {
    path: "/operational-requirements/create",
    action: () => ({
      component: <CreateOperationalRequirement />,
    }),
  },
  {
    path: "/operational-requirements/:id/edit",
    action: ({ params }) => ({
      component: (
        <UpdateOperationalRequirement
          operationalRequirementId={params.id as string}
        />
      ),
    }),
  },
  {
    path: "/pools/:id/pool-candidates",
    action: ({ params }) => ({
      component: <PoolCandidatePage poolId={params.id as string} />,
    }),
  },
  {
    path: "/pools/:id/pool-candidates/create",
    action: ({ params }) => ({
      component: <CreatePoolCandidate poolId={params.id as string} />,
    }),
  },
  {
    path: "/pools/:id/pool-candidates/:candidateId/edit",
    action: ({ params }) => ({
      component: (
        <UpdatePoolCandidate poolCandidateId={params.candidateId as string} />
      ),
    }),
  },
  {
    path: "/pools",
    action: () => ({
      component: <PoolPage />,
    }),
  },
  {
    path: "/pools/create",
    action: () => ({
      component: <CreatePool />,
    }),
  },
  {
    path: "/pools/:id/edit",
    action: ({ params }) => ({
      component: <UpdatePool poolId={params.id as string} />,
    }),
  },
];

export const PoolDashboard: React.FC = () => {
  const [result] = useGetPoolsQuery();
  const { data, fetching, error } = result;
  const intl = useIntl();

  const menuItems = [
    <MenuHeading
      key="admin-tools"
      text={intl.formatMessage(messages.menuAdminTools)}
    />,
    <MenuLink
      key="users"
      href="/users"
      text={intl.formatMessage(messages.menuUsers)}
    />,
    <MenuLink
      key="classifications"
      href="/classifications"
      text={intl.formatMessage(messages.menuClassifications)}
    />,
    <MenuLink
      key="cmo-assets"
      href="/cmo-assets"
      text={intl.formatMessage(messages.menuCmoAssets)}
    />,
    <MenuLink
      key="operational-requirements"
      href="/operational-requirements"
      text={intl.formatMessage(messages.menuOperationalRequirements)}
    />,
    <MenuLink
      key="pools"
      href="/pools"
      text={intl.formatMessage(messages.menuPools)}
    />,
  ];

  if (!fetching && !error) {
    menuItems.push(
      <MenuHeading
        key="pool-candidates"
        text={intl.formatMessage(messages.menuPoolCandidates)}
      />,
    );
    data?.pools.map((pool) =>
      menuItems.push(
        <MenuLink
          key={`/pools/${pool?.id}/pool-candidates`}
          href={`/pools/${pool?.id}/pool-candidates`}
          text={(pool?.name && pool?.name[getLocale(intl)]) ?? ""}
        />,
      ),
    );
  }

  return (
    <ErrorContainer>
      <ClientProvider>
        <Dashboard menuItems={menuItems} contentRoutes={routes} />
      </ClientProvider>
    </ErrorContainer>
  );
};

export default PoolDashboard;
