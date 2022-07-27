import React from "react";
import { useIntl } from "react-intl";
import Link from "@common/components/Link";
import Pending from "@common/components/Pending";
import { useAdminRoutes } from "../../adminRoutes";
import { ClassificationTableApi } from "./ClassificationTable";

export const ClassificationPage: React.FC = () => {
  const intl = useIntl();
  const paths = useAdminRoutes();
  return (
    <Pending fetching={false}>
      <div>
        <header
          data-h2-background-color="base(dt-linear)"
          data-h2-padding="base(x2, 0)"
        >
          <div data-h2-container="base(center, large, x2)">
            <div data-h2-flex-grid="base(center, 0, x2)">
              <div data-h2-flex-item="base(1of1) l-tablet(fill)">
                <h1
                  data-h2-color="base(dt-white)"
                  data-h2-font-weight="base(700)"
                  data-h2-margin="base(0)"
                  style={{ letterSpacing: "-2px" }}
                >
                  {intl.formatMessage({
                    defaultMessage: "Classifications",
                    description:
                      "Heading displayed above the Classification Table component.",
                  })}
                </h1>
              </div>
              <div
                data-h2-flex-item="base(1of1) l-tablet(content)"
                data-h2-text-align="l-tablet(right)"
              >
                <Link
                  href={paths.classificationCreate()}
                  color="white"
                  mode="outline"
                  type="button"
                >
                  {intl.formatMessage({
                    defaultMessage: "Create Classification",
                    description:
                      "Heading displayed above the Create Classification form.",
                  })}
                </Link>
              </div>
            </div>
          </div>
        </header>
        <ClassificationTableApi />
      </div>
    </Pending>
  );
};

export default ClassificationPage;
