/* eslint-disable react/jsx-key */
import React, { ReactElement, useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import { useTable, useGlobalFilter, useSortBy, Column } from "react-table";
import Button from "../Button";
import GlobalFilter from "./GlobalFilter";

const messages = defineMessages({
  toggleTableColumnsLabel: {
    id: "table.toggleTableColumnsLabel",
    defaultMessage: "Hide/Show Table Columns",
    description: "Label displayed on the Table Columns toggle.",
  },
  toggleAllTableColumnsLabel: {
    id: "table.toggleAllTableColumnsLabel",
    defaultMessage: "Toggle All",
    description: "Label displayed on the Table Columns toggle fieldset.",
  },
});

export type ColumnsOf<T extends Record<string, unknown>> = Array<Column<T>>;

interface TableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  columns: Array<Column<T>>;
  data: Array<T>;
  filter?: boolean;
  hiddenCols?: string[];
}

const IndeterminateCheckbox: React.FC<
  React.HTMLProps<HTMLInputElement> & { indeterminate: boolean }
> = ({ indeterminate, ...rest }) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} {...rest} />;
};

function Table<T extends Record<string, unknown>>({
  columns,
  data,
  filter = true,
  hiddenCols = [],
}: TableProps<T>): ReactElement {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    preGlobalFilteredRows,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable<T>(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: hiddenCols,
      },
    },
    useGlobalFilter,
    useSortBy,
  );

  const [showList, setShowList] = useState(false);
  const intl = useIntl();

  return (
    <div>
      {filter ? (
        <div data-h2-padding="b(top-bottom, m) b(right-left, xl)">
          <div data-h2-flex-grid="b(middle, expanded, flush, m)">
            <div data-h2-flex-item="b(1of1) m(1of3)">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </div>
            <div
              data-h2-flex-item="b(1of1) m(2of3)"
              data-h2-text-align="b(center) m(right)"
            >
              <Button
                color="secondary"
                mode="inline"
                onClick={() => {
                  setShowList((currentState) => !currentState);
                }}
              >
                {intl.formatMessage(messages.toggleTableColumnsLabel)}
              </Button>
              {showList ? (
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    padding: "10px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <IndeterminateCheckbox
                      {...(getToggleHideAllColumnsProps() as React.ComponentProps<
                        typeof IndeterminateCheckbox
                      >)}
                    />{" "}
                    {intl.formatMessage(messages.toggleAllTableColumnsLabel)}
                  </div>
                  {allColumns.map((column) => (
                    <div key={column.id}>
                      <label>
                        <input
                          type="checkbox"
                          {...column.getToggleHiddenProps()}
                        />{" "}
                        {column.id}
                      </label>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  data-h2-padding="b(right-left, m)"
                  data-h2-text-align="b(center)"
                  data-h2-font-size="b(caption)"
                >
                  {column.render("Header")}
                  <span data-h2-font-color="b(lightpurple)">
                    {column.isSorted && (column.isSortedDesc ? " ▼" : " ▲")}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      data-h2-padding="b(right-left, m)"
                      data-h2-text-align="b(center)"
                      data-h2-font-size="b(caption)"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
