import React from "react";
import { useIntl } from "react-intl";
import PageHeader from "@common/components/PageHeader";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import Breadcrumbs from "@common/components/Breadcrumbs";
import Pending from "@common/components/Pending";
import { getLocale } from "@common/helpers/localize";
import DashboardContentContainer from "../DashboardContentContainer";
import PoolCandidatesTable from "./PoolCandidatesTable";
import { useAdminRoutes } from "../../adminRoutes";
import { useGetPoolQuery } from "../../api/generated";

export const PoolCandidatePage: React.FC<{ poolId: string }> = ({ poolId }) => {
  const intl = useIntl();
  const locale = getLocale(intl);
  const paths = useAdminRoutes();

  const [{ data, fetching, error }] = useGetPoolQuery({
    variables: {
      id: poolId,
    },
  });

  const crumbs = [
    {
      title: intl.formatMessage({
        defaultMessage: "My Pools",
        id: "XYLd6G",
        description: "Breadcrumb for the My Pools page",
      }),
      href: paths.poolTable(),
    },
    {
      title:
        data?.pool?.name?.[locale] ||
        intl.formatMessage({
          defaultMessage: "Pool name not found",
          id: "HGMl3y",
          description: "Breadcrumb to pool page if pool name not found",
        }),
      href: paths.poolTable(),
    },
    {
      title: intl.formatMessage({
        defaultMessage: "All Candidates",
        id: "v8vbWP",
        description: "Breadcrumb for the All Candidates page",
      }),
    },
  ];

  return (
    <Pending fetching={fetching} error={error}>
      <div
        data-h2-background-color="base(dt-gray.light)"
        data-h2-padding="base(20px, 20px, 20px, 20px)"
      >
        <Breadcrumbs links={crumbs} />
      </div>
      <DashboardContentContainer>
        <PageHeader icon={Squares2X2Icon}>
          {intl.formatMessage({
            id: "EHVt0j",
            defaultMessage: "Pool Candidates",
            description:
              "Title displayed above the Pool Candidate Table component.",
          })}
        </PageHeader>
        <p>
          {intl.formatMessage({
            defaultMessage:
              "This table shows a list of all applicants to this pool. Use the review button to manage an applicant.",
            id: "drwKS5",
            description:
              "Descriptive text about the list of pool candidates in the admin portal.",
          })}
        </p>
        <PoolCandidatesTable poolId={poolId} />
      </DashboardContentContainer>
    </Pending>
  );
};

export default PoolCandidatePage;
