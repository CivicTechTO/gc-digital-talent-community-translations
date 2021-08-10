import React, { useMemo } from "react";
import { defineMessages, useIntl } from "react-intl";
import commonMessages from "./commonMessages";
import { GetPoolsQuery, useGetPoolsQuery } from "../api/generated";
import { navigate, useLocation } from "../helpers/router";
import { notEmpty } from "../helpers/util";
import { FromArray } from "../types/utilityTypes";
import Button from "./H2Components/Button";
import Table, { ColumnsOf } from "./Table";

const messages = defineMessages({
  columnUniqueIdentifier: {
    id: "PoolTable.column.uniqueIdentifier",
    defaultMessage: "First Name",
    description: "Title displayed on the Pool table Unique Identifier column.",
  },
  columnOwnerEmail: {
    id: "PoolTable.column.email",
    defaultMessage: "Last Name",
    description: "Title displayed for the Pool table email column.",
  },
  columnGroupAndLevel: {
    id: "PoolTable.column.groupAndLevel",
    defaultMessage: "Telephone",
    description: "Title displayed for the Pool table Group and Level column.",
  },
  columnEditTitle: {
    id: "userTable.column.editTitle",
    defaultMessage: "Edit",
    description: "Title displayed for the User table Edit column.",
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
        Header: intl.formatMessage(messages.columnOwnerEmail),
        accessor: ({ owner }) => owner?.email,
      },
      {
        Header: intl.formatMessage(messages.columnGroupAndLevel),
        accessor: "classifications",
      },
      {
        Header: intl.formatMessage(messages.columnUniqueIdentifier),
        accessor: ({ owner }) => owner?.email,
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
      <Table data={data} columns={columns} />
    </>
  );
};

export const PoolTableApi: React.FunctionComponent = () => {
  const intl = useIntl();
  const [result] = useGetPoolsQuery();
  const { data, fetching, error } = result;
  const { pathname } = useLocation();

  if (fetching) return <p>{intl.formatMessage(commonMessages.loadingTitle)}</p>;
  if (error)
    return (
      <p>
        {intl.formatMessage(commonMessages.loadingError)} {error.message}
      </p>
    );

  return <PoolTable pools={data?.pools ?? []} editUrlRoot={pathname} />;
};
