import React, { useMemo } from "react";
import { defineMessages, useIntl } from "react-intl";
import { Button, Pill } from "gc-digital-talent-common/components";
import {
  navigate,
  notEmpty,
  getLocale,
  useLocation,
} from "gc-digital-talent-common/helpers";
import { commonMessages } from "gc-digital-talent-common/messages";
import { GetPoolsQuery, useGetPoolsQuery } from "../../api/generated";
import { FromArray } from "../../types/utilityTypes";
import Table, { ColumnsOf } from "../Table";
import DashboardContentContainer from "../DashboardContentContainer";

const messages = defineMessages({
  columnUniqueIdentifier: {
    id: "poolTable.column.uniqueIdentifier",
    defaultMessage: "Id",
    description: "Title displayed on the Pool table Unique Identifier column.",
  },
  columnPoolName: {
    id: "poolTable.column.poolName",
    defaultMessage: "Pool Name",
    description: "Title displayed for the Pool table pool name column.",
  },
  columnPoolDescription: {
    id: "poolTable.column.poolDescription",
    defaultMessage: "Pool Description",
    description: "Title displayed for the Pool table pool description column.",
  },
  columnOwnerEmail: {
    id: "poolTable.column.email",
    defaultMessage: "Owner",
    description: "Title displayed for the Pool table owner email column.",
  },
  columnGroupAndLevel: {
    id: "poolTable.column.groupAndLevel",
    defaultMessage: "Group and Level",
    description: "Title displayed for the Pool table Group and Level column.",
  },
  columnEditTitle: {
    id: "poolTable.column.editTitle",
    defaultMessage: "Edit",
    description: "Title displayed for the Pool table Edit column.",
  },
});

type Data = NonNullable<FromArray<GetPoolsQuery["pools"]>>;

export const PoolTable: React.FC<GetPoolsQuery & { editUrlRoot: string }> = ({
  pools,
  editUrlRoot,
}) => {
  const intl = useIntl();
  const columns = useMemo<ColumnsOf<Data>>(
    () => [
      {
        Header: intl.formatMessage(messages.columnUniqueIdentifier),
        accessor: "id",
      },
      {
        Header: intl.formatMessage(messages.columnPoolName),
        id: "name",
        accessor: (d) => (d.name ? d.name[getLocale(intl)] : ""),
      },
      {
        Header: intl.formatMessage(messages.columnPoolDescription),
        id: "description",
        accessor: (d) => (d.description ? d.description[getLocale(intl)] : ""),
      },
      {
        Header: intl.formatMessage(messages.columnOwnerEmail),
        accessor: ({ owner }) => owner?.email,
      },
      {
        Header: intl.formatMessage(messages.columnGroupAndLevel),
        accessor: ({ classifications }) =>
          classifications?.map((classification) => {
            return (
              <Pill
                key={`${classification?.group}-${classification?.level}`}
                content={`${classification?.group}-${classification?.level}`}
              />
            );
          }),
      },
      {
        Header: intl.formatMessage(messages.columnEditTitle),
        id: "edit",
        accessor: ({ id }) => (
          <Button
            color="white"
            mode="solid"
            onClick={(event) => {
              event.preventDefault();
              navigate(`${editUrlRoot}/${id}/edit`);
            }}
          >
            {intl.formatMessage(messages.columnEditTitle)}
          </Button>
        ),
      },
    ],
    [editUrlRoot, intl],
  );

  const data = useMemo(() => pools.filter(notEmpty), [pools]);

  return (
    <>
      <Table data={data} columns={columns} hiddenCols={["id", "description"]} />
    </>
  );
};

export const PoolTableApi: React.FunctionComponent = () => {
  const intl = useIntl();
  const [result] = useGetPoolsQuery();
  const { data, fetching, error } = result;
  const { pathname } = useLocation();

  if (fetching)
    return (
      <DashboardContentContainer>
        <p>{intl.formatMessage(commonMessages.loadingTitle)}</p>
      </DashboardContentContainer>
    );
  if (error)
    return (
      <DashboardContentContainer>
        <p>
          {intl.formatMessage(commonMessages.loadingError)} {error.message}
        </p>
      </DashboardContentContainer>
    );

  return <PoolTable pools={data?.pools ?? []} editUrlRoot={pathname} />;
};
