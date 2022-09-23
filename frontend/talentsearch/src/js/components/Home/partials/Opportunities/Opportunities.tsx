// Vendor dependencies
import React from "react";
import { useIntl } from "react-intl";

// Local assets
import Heading from "@common/components/Heading";
import useLocale from "@common/hooks/useLocale";
import { imageUrl } from "@common/helpers/router";

import Block from "./Block";
import SectionIcon from "./SectionIcon";

import TALENTSEARCH_APP_DIR from "../../../../talentSearchConstants";
import { useDirectIntakeRoutes } from "../../../../directIntakeRoutes";

// Create the page component
const Opportunities = () => {
  const intl = useIntl();
  const diPaths = useDirectIntakeRoutes();
  const locale = useLocale();
  // This array is just a temporary data object representing the content required by the opportunity entries. This data will need to be migrated to wherever makes sense, and we'll also need dynamic routes and translated strings
  const opportunities = [
    {
      key: "digital",
      color: "yellow",
      title: intl.formatMessage({
        defaultMessage: "Jobs in digital government",
        id: "+cBKDC",
        description: "Heading for the digital government job opportunities",
      }),
      summary: intl.formatMessage({
        defaultMessage:
          "Check out the latest GC opportunities in digital and tech, from entry level to management. Find a team, make a difference, and be inspired.",
        id: "951Oju",
        description: "Description for the digital government job opportunities",
      }),
      link: {
        path: diPaths.allPools(),
        label: intl.formatMessage({
          defaultMessage: "Browse IT jobs",
          id: "zNvXSs",
          description: "Link text for IT jobs in government call to action",
        }),
      },
    },
    {
      key: "iap",
      color: "blue",
      title: intl.formatMessage({
        defaultMessage: "Indigenous Apprenticeship Program",
        id: "XR37x0",
        description:
          "Heading for the Indigenous Apprenticeship Program on home page",
      }),
      summary: intl.formatMessage({
        defaultMessage:
          "Designed by the Indigenous community for the Indigenous community, this program recruits entry-level applicants for learning and development IT opportunities across government.",
        id: "f3Qqop",
        description:
          "Description for the Indigenous Apprenticeship Program on home page",
      }),
      link: {
        path: `${locale}/indigenous-it-apprentice`,
        label: intl.formatMessage({
          defaultMessage:
            "Apply<hidden> to the Indigenous Apprenticeship Program</hidden> now",
          description:
            "Link text to apply for the Indigenous Apprenticeship Program",
          id: "w3Kkk2",
        }),
      },
    },
    {
      key: "exec",
      color: "red",
      title: intl.formatMessage({
        defaultMessage: "Executives in digital government",
        id: "9KOwXq",
        description: "Heading for executive jobs in government",
      }),
      summary: intl.formatMessage({
        defaultMessage:
          "From entry-level executives to CIO opportunities across the GC, this is the place to come if you’re ready to take on a digital leadership role making a difference for Canadians.",
        id: "pDGY5P",
        description: "Description for executive jobs in government",
      }),
      link: {
        path: "https://google.com", // TO DO: Get new path
        label: intl.formatMessage({
          defaultMessage: "Browse exec jobs",
          id: "QcrDDA",
          description: "Link text to find executive jobs in government",
        }),
      },
    },
  ];
  return (
    <div data-h2-margin="base(-3%, 0, 0, 0)" data-h2-layer="base(2, relative)">
      <div
        data-h2-height="base(100%)"
        data-h2-width="base(100%)"
        data-h2-background-color="base(white) base:dark(black.light)"
        data-h2-position="base(absolute)"
        data-h2-transform="base(skewY(-3deg))"
        data-h2-overflow="base(hidden)"
      >
        <img
          data-h2-display="base(block) base:dark(none)"
          data-h2-position="base(absolute)"
          data-h2-offset="base(0, 0, auto, auto)"
          data-h2-transform="base(translate(32%, -52%) skew(3deg)) l-tablet(translate(0, 0) skew(3deg))"
          data-h2-height="base(auto) l-tablet(40%)"
          data-h2-width="base(250%) l-tablet(auto)"
          data-h2-max-width="base(initial)"
          src={imageUrl(TALENTSEARCH_APP_DIR, "Desktop_Graphics_light_1.png")}
          alt=""
        />
        <img
          data-h2-display="base(none) base:dark(block)"
          data-h2-position="base(absolute)"
          data-h2-offset="base(0, 0, auto, auto)"
          data-h2-transform="base(translate(32%, -52%) skew(3deg)) l-tablet(translate(0, 0) skew(3deg))"
          data-h2-height="base(auto) l-tablet(40%)"
          data-h2-width="base(250%) l-tablet(auto)"
          data-h2-max-width="base(initial)"
          src={imageUrl(TALENTSEARCH_APP_DIR, "Desktop_Graphics_dark_1.png")}
          alt=""
        />
        <div
          data-h2-background-color="base(tm-linear-divider)"
          data-h2-offset="base(0, 0, auto, 0)"
          data-h2-display="base(block)"
          data-h2-height="base(x1)"
          data-h2-position="base(absolute)"
        />
      </div>
      <div
        data-h2-position="base(relative)"
        data-h2-container="base(center, large, x1) p-tablet(center, large, x2)"
      >
        <div data-h2-padding="base(x3, 0) p-tablet(x5, 0, x4, 0) l-tablet(x7, 0, x6, 0)">
          {/* Requires an ID and a translated text string */}
          <Heading
            level="h2"
            Icon={SectionIcon}
            color="yellow"
            data-h2-margin="base(0, 0, x0.5, 0)"
          >
            {intl.formatMessage({
              defaultMessage: "Ongoing recruitment",
              id: "nEMeaQ",
              description: "Heading for the recruitment opportunities",
            })}
          </Heading>
          <div
            data-h2-display="base(grid)"
            data-h2-grid-template-columns="base(1fr) p-tablet(repeat(2, minmax(0, 1fr))) l-tablet(repeat(3, minmax(0, 1fr)))"
            data-h2-gap="base(x2) p-tablet(x3)"
            data-h2-padding="base(x2, 0, 0, 0) p-tablet(x3, 0, 0, 0)"
          >
            {opportunities.map((item) => (
              <Block key={item.key} content={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default Opportunities;
