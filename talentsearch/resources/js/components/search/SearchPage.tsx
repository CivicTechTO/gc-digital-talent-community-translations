import { imageUrl } from "@common/helpers/router";
import React from "react";
import { defineMessages, useIntl } from "react-intl";
import { BASE_URL } from "../../talentSearchConstants";

const messages = defineMessages({
  pageHeading: {
    id: "searchPage.tableHeading",
    defaultMessage: "Search the Digital Talent Pool",
    description: "Heading displayed above the Search form component.",
  },
});

export const ClassificationPage: React.FC = () => {
  const intl = useIntl();
  return (
    <div>
      <div
        data-h2-position="b(relative)"
        style={{
          height: "380px",
          background: `linear-gradient(70deg, rgba(103, 76, 144, 0.9), rgba(29, 44, 76, 1)), url(${imageUrl(
            BASE_URL,
            "hero-background-search.png",
          )})`,
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <h1
          data-h2-margin="b(all, none)"
          data-h2-padding="b(top, l) b(right-left, s)"
          data-h2-text-align="b(center)"
          data-h2-font-color="b(white)"
          data-h2-font-weight="b(800)"
          style={{ letterSpacing: "-2px" }}
        >
          {intl.formatMessage(messages.pageHeading)}
        </h1>
        <p
          data-h2-padding="b(all, xs)"
          data-h2-text-align="b(center)"
          data-h2-font-color="b(white)"
          data-h2-font-weight="b(300)"
        >
          TODO:{" "}
          <a href="/" title="Breadcrumbs">
            Breadcrumbs
          </a>{" "}
          / Current Page
        </p>

        <div
          data-h2-position="b(absolute)"
          data-h2-bg-color="b(white)"
          data-h2-margin="b(right-left, xxl)"
          data-h2-padding="b(top-bottom, l) b(right-left, m)"
          data-h2-radius="b(s)"
          data-h2-shadow="b(s)"
          style={{
            bottom: "-4rem",
          }}
        >
          <h2
            data-h2-font-color="b(black)"
            data-h2-font-weight="b(300)"
            data-h2-margin="b(all, none)"
          >
            About the CS - Digital Talent Pool
          </h2>
          <p>
            This pool is open to most departments and agencies. Candidates in
            the pool vary from just starting their career to seasoned
            professionals with several years of work experience. This is an
            ongoing recruitment pool, which means new candidates are being added
            every week.
          </p>
        </div>
      </div>
      <div
        data-h2-margin="b(right-left, s)"
        data-h2-padding="b(top, xxl) b(bottom, l) b(right-left, xl)"
      >
        <h2
          data-h2-font-color="b(black)"
          data-h2-font-weight="b(300)"
          data-h2-margin="b(all, none)"
        >
          How to use this tool
        </h2>
        <p>
          Use the filters below to specify your hiring needs. At any time you
          can look at the results located at the bottom of this page to see how
          many candidates match the requirements you have entered. When you are
          comfortable with the filters you have selected, click the Request
          Candidates button to add more details and submit a request form.
        </p>
      </div>
    </div>
  );
};

export default ClassificationPage;
