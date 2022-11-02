import { getLocale } from "@common/helpers/localize";
import { FilterBlock } from "@common/components/SearchRequestFilters/deprecated/SearchRequestFilters";
import SearchRequestFilters from "@common/components/SearchRequestFilters/SearchRequestFilters";
import * as React from "react";
import { useIntl } from "react-intl";
import { commonMessages } from "@common/messages";
import { notEmpty } from "@common/helpers/util";
import { getPoolCandidateSearchStatus } from "@common/constants/localizedConstants";
import Pending from "@common/components/Pending";
import NotFound from "@common/components/NotFound";
import {
  ApplicantFilter,
  PoolCandidateFilter,
  PoolCandidateFilterInput,
  PoolCandidateSearchRequest,
  useGetPoolCandidateSearchRequestQuery,
} from "../../api/generated";
import {
  SingleSearchRequestTableApi,
  checkIsLegacyFilter,
} from "./SingleSearchRequestTable";
import type { AbstractFilterInput } from "./SingleSearchRequestTable";
import { UpdateSearchRequest } from "./UpdateSearchRequest";

const ManagerInfo: React.FunctionComponent<{
  searchRequest: PoolCandidateSearchRequest;
}> = ({ searchRequest }) => {
  const intl = useIntl();
  const locale = getLocale(intl);
  const {
    fullName,
    department,
    email,
    jobTitle,
    status,
    requestedDate,
    poolCandidateFilter,
    applicantFilter,
  } = searchRequest;

  const nonApplicableMessage = intl.formatMessage({
    defaultMessage: "N/A",
    id: "i9AjuX",
    description: "Text shown when the filter was not selected",
  });

  return (
    <>
      <h2
        data-h2-margin="base(x2, 0, x.5, 0)"
        data-h2-font-size="base(h4, 1.3)"
      >
        {intl.formatMessage({
          defaultMessage: "Manager Information",
          id: "UEsexn",
          description:
            "Heading for the manager info section of the single search request view.",
        })}
      </h2>
      <div data-h2-background-color="base(lightest.dt-gray)">
        <div data-h2-padding="base(x1)">
          <div
            data-h2-flex-grid="base(stretch, x1, 0)"
            style={{ overflowWrap: "break-word" }}
          >
            <div
              data-h2-flex-item="base(1of1) p-tablet(1of4)"
              data-h2-border="p-tablet(right, 1px, solid, dt-gray)"
            >
              <div
                data-h2-padding="base(0, x1, 0, 0)"
                data-h2-height="base(100%)"
              >
                <FilterBlock
                  title={intl.formatMessage({
                    defaultMessage: "Full Name",
                    id: "W9DTVh",
                    description:
                      "Title for the full name block in the manager info section of the single search request view.",
                  })}
                  content={fullName}
                />
                <FilterBlock
                  title={intl.formatMessage({
                    defaultMessage: "Government Email",
                    id: "d3oN4p",
                    description:
                      "Title for the government email block in the manager info section of the single search request view.",
                  })}
                  content={email}
                />
              </div>
            </div>
            <div
              data-h2-flex-item="base(1of1) p-tablet(1of4)"
              data-h2-border="p-tablet(right, 1px, solid, dt-gray)"
            >
              <div
                data-h2-padding="base(0, x1, 0, 0)"
                data-h2-height="base(100%)"
              >
                <FilterBlock
                  title={intl.formatMessage({
                    defaultMessage: "Department",
                    id: "zwcUgi",
                    description:
                      "Title for the department block in the manager info section of the single search request view.",
                  })}
                  content={department?.name?.[locale]}
                />
                <FilterBlock
                  title={intl.formatMessage({
                    defaultMessage: "Job title for this position",
                    id: "gRPGQN",
                    description:
                      "Title for the job title block in the manager info section of the single search request view.",
                  })}
                  content={jobTitle}
                />
              </div>
            </div>
            <div
              data-h2-flex-item="base(1of1) p-tablet(1of4)"
              data-h2-border="p-tablet(right, 1px, solid, dt-gray)"
            >
              <div
                data-h2-padding="base(0, x1, 0, 0)"
                data-h2-height="base(100%)"
              >
                <FilterBlock
                  title={intl.formatMessage({
                    defaultMessage: "Pool Requested",
                    id: "rz8uPO",
                    description:
                      "Title for the pool block in the manager info section of the single search request view.",
                  })}
                  content={
                    applicantFilter
                      ? applicantFilter?.pools?.map(
                          (pool) =>
                            pool?.name?.[locale] || nonApplicableMessage,
                        )
                      : poolCandidateFilter?.pools?.map(
                          (pool) =>
                            pool?.name?.[locale] || nonApplicableMessage,
                        )
                  }
                />

                <FilterBlock
                  title={intl.formatMessage({
                    defaultMessage: "Status",
                    id: "Lzd38d",
                    description:
                      "Title for the status block in the manager info section of the single search request view.",
                  })}
                  content={
                    status
                      ? intl.formatMessage(getPoolCandidateSearchStatus(status))
                      : intl.formatMessage({
                          defaultMessage: "N/A",
                          id: "i9AjuX",
                          description:
                            "Text shown when the filter was not selected",
                        })
                  }
                />
              </div>
            </div>
            <div data-h2-flex-item="base(1of1) p-tablet(1of4)">
              <div
                data-h2-padding="base(0, x1, 0, 0)"
                data-h2-height="base(100%)"
              >
                <FilterBlock
                  title={intl.formatMessage({
                    defaultMessage: "Date Requested",
                    id: "hzL/Gd",
                    description:
                      "Title for the date requested block in the manager info section of the single search request view.",
                  })}
                  content={requestedDate}
                />
                <FilterBlock
                  title={intl.formatMessage({
                    defaultMessage: "Date done",
                    id: "BAzKWq",
                    description:
                      "Title for the date done block in the manager info section of the single search request view.",
                  })}
                  content="NA (Request is still pending)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface SingleSearchRequestProps {
  searchRequest: PoolCandidateSearchRequest;
}

export const SingleSearchRequest: React.FunctionComponent<
  SingleSearchRequestProps
> = ({ searchRequest }) => {
  const intl = useIntl();
  const locale = getLocale(intl);
  const { additionalComments, poolCandidateFilter, applicantFilter } =
    searchRequest;
  // TODO: data filter data from applicantFilter instead of poolCandidateFilter if possible.

  const transformFilterToInput = (
    inputFilter: PoolCandidateFilter,
  ): PoolCandidateFilterInput => {
    return {
      expectedClassifications: [
        ...(inputFilter?.classifications
          ? inputFilter.classifications
              .filter(notEmpty)
              .map(({ group, level }) => {
                return {
                  group,
                  level,
                };
              })
          : []),
      ],
      cmoAssets: [
        ...(inputFilter?.cmoAssets
          ? inputFilter.cmoAssets.filter(notEmpty).map(({ key }) => {
              return {
                key,
              };
            })
          : []),
      ],
      operationalRequirements: inputFilter?.operationalRequirements,
      pools: [
        ...(inputFilter?.pools
          ? inputFilter.pools.filter(notEmpty).map(({ id }) => {
              return {
                id,
              };
            })
          : []),
      ],
      hasDiploma: inputFilter?.hasDiploma,
      equity: {
        hasDisability: inputFilter?.equity?.hasDisability,
        isIndigenous: inputFilter?.equity?.isIndigenous,
        isVisibleMinority: inputFilter?.equity?.isVisibleMinority,
        isWoman: inputFilter?.equity?.isWoman,
      },
      languageAbility: inputFilter?.languageAbility || undefined,
      locationPreferences: inputFilter?.workRegions,
    };
  };

  return (
    <section>
      <p>
        {intl.formatMessage(
          {
            defaultMessage:
              "<strong>{jobTitle}</strong> at <strong>{department}</strong>",
            id: "ZLDt/c",
            description:
              "Subtitle displayed above the single search request component.",
          },
          {
            jobTitle: searchRequest.jobTitle,
            department: searchRequest.department?.name[locale],
          },
        )}
      </p>
      <ManagerInfo searchRequest={searchRequest} />
      <div>
        <h2
          data-h2-margin="base(x2, 0, x.5, 0)"
          data-h2-font-size="base(h4, 1.3)"
        >
          {intl.formatMessage({
            defaultMessage: "Request Information",
            id: "AAmd5G",
            description:
              "Heading for the request information section of the single search request view.",
          })}
        </h2>
        <div
          data-h2-padding="base(x1)"
          data-h2-background-color="base(lightest.dt-gray)"
        >
          <SearchRequestFilters
            filters={applicantFilter || poolCandidateFilter}
          />
          <div
            data-h2-padding="base(x1, 0, 0, 0)"
            data-h2-border="base(top, 1px, solid, dt-gray)"
            data-h2-margin="base(x1, 0, 0, 0)"
          >
            <FilterBlock
              title={intl.formatMessage({
                defaultMessage: "Additional Comments",
                id: "WqOnFF",
                description:
                  "Title for the additional comments block in the search request filters",
              })}
              content={additionalComments}
            />
          </div>
        </div>
      </div>
      <div>
        <h2
          data-h2-margin="base(x2, 0, 0, 0)"
          data-h2-font-size="base(h4, 1.3)"
        >
          {intl.formatMessage({
            defaultMessage: "Candidate Results",
            id: "Duswz0",
            description:
              "Heading for the candidate results section of the single search request view.",
          })}
        </h2>
        {poolCandidateFilter && (
          <SingleSearchRequestTableApi
            filterInput={transformFilterToInput(poolCandidateFilter)}
          />
        )}
      </div>
      <UpdateSearchRequest initialSearchRequest={searchRequest} />
    </section>
  );
};

export const SingleSearchRequestApi: React.FunctionComponent<{
  searchRequestId: string;
}> = ({ searchRequestId }) => {
  const intl = useIntl();
  const [{ data: searchRequestData, fetching, error }] =
    useGetPoolCandidateSearchRequestQuery({
      variables: { id: searchRequestId },
    });

  return (
    <Pending fetching={fetching} error={error}>
      {searchRequestData?.poolCandidateSearchRequest ? (
        <SingleSearchRequest
          searchRequest={searchRequestData?.poolCandidateSearchRequest}
        />
      ) : (
        <NotFound headingMessage={intl.formatMessage(commonMessages.notFound)}>
          <p>
            {intl.formatMessage(
              {
                defaultMessage: "Search Request {searchRequestId} not found.",
                id: "BbaMf0",
                description:
                  "Message displayed for search request not found on single search request page.",
              },
              { searchRequestId },
            )}
          </p>
        </NotFound>
      )}
    </Pending>
  );
};
