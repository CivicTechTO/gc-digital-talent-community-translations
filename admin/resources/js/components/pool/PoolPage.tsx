import React from "react";
import { defineMessages, useIntl } from "react-intl";
import { Link } from "../../helpers/router";
import Button from "../H2Components/Button";
import { PoolTableApi } from "./PoolTable";

const messages = defineMessages({
  tableHeading: {
    id: "poolPage.tableHeading",
    defaultMessage: "Pools",
    description: "Heading displayed above the Pool Table component.",
  },
  createHeading: {
    id: "poolPage.createHeading",
    defaultMessage: "Create Pool",
    description: "Heading displayed above the Create Pool form.",
  },
});

export const PoolPage: React.FC = () => {
  const intl = useIntl();
  return (
    <div>
      <header
        data-h2-bg-color="b(linear-70[lightpurple][lightnavy])"
        data-h2-padding="b(top-bottom, l) b(right-left, xl)"
      >
        <div data-h2-flex-grid="b(middle, expanded, flush, l)">
          <div data-h2-flex-item="b(1of1) m(3of5)">
            <h1
              data-h2-font-color="b(white)"
              data-h2-font-weight="b(800)"
              data-h2-margin="b(all, none)"
              style={{ letterSpacing: "-2px" }}
            >
              {intl.formatMessage(messages.tableHeading)}
            </h1>
          </div>
          <div
            data-h2-flex-item="b(1of1) m(2of5)"
            data-h2-text-align="m(right)"
          >
            <Button color="white" mode="outline">
              <Link href="/admin/pools/create" title="">
                {intl.formatMessage(messages.createHeading)}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <PoolTableApi />
    </div>
  );
};

export default PoolPage;
