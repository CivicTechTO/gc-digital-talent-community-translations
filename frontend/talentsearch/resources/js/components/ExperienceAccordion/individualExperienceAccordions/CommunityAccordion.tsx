import React from "react";
import { Accordion } from "@common/components/accordion/Accordion";
import BriefCaseIcon from "@heroicons/react/solid/BriefcaseIcon";
import { Button } from "@common/components";
import { CommunityExperience } from "@common/api/generated";
import { useIntl } from "react-intl";
import { getLocale } from "@common/helpers/localize";

const CommunityAccordion: React.FunctionComponent<CommunityExperience> = ({
  title,
  organization,
  startDate,
  endDate,
  details,
  project,
  experienceSkills,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl);

  // create unordered list element of skills DOM Element
  const skillsList = experienceSkills
    ? experienceSkills.map((skill, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ul key={index}>
          <li>
            <p>
              {skill?.skill.name?.[locale]}
              <br />
              {skill?.skill.description?.[locale]}
            </p>
          </li>
        </ul>
      ))
    : "";

  return (
    <Accordion
      title={intl.formatMessage(
        {
          defaultMessage: "{title} at {organization}",
          description: "Title at organization",
        },
        { title, organization },
      )}
      subtitle={
        endDate
          ? `${startDate || ""} - ${endDate || ""}`
          : intl.formatMessage(
              {
                defaultMessage: "Since: {startDate}",
                description: "Since",
              },
              { startDate },
            )
      }
      context={
        experienceSkills?.length === 1
          ? intl.formatMessage({
              defaultMessage: "1 Skill",
              description: "Pluralization for one skill",
            })
          : intl.formatMessage(
              {
                defaultMessage: "{skillsLength} Skills",
                description: "Pluralization for zero or multiple skills",
              },
              { skillsLength: experienceSkills?.length },
            )
      }
      Icon={BriefCaseIcon}
    >
      {" "}
      <div data-h2-padding="b(left, l)">
        <p>
          {intl.formatMessage(
            {
              defaultMessage: "{title} at {organization}",
              description: "Title at organization",
            },
            { title, organization },
          )}
        </p>
        <p>{project}</p>
      </div>
      <hr />
      <div data-h2-padding="b(left, l)">{skillsList}</div>
      <div data-h2-padding="b(left, l)">
        <p>
          {intl.formatMessage(
            {
              defaultMessage: "Additional information: {details}",
              description: "Additional information if provided",
            },
            { details },
          )}
        </p>
      </div>
      <div data-h2-padding="b(left, l)">
        <Button color="primary" mode="outline">
          {intl.formatMessage({
            defaultMessage: "Edit Experience",
            description: "Edit Experience button label",
          })}
        </Button>
      </div>
    </Accordion>
  );
};

export default CommunityAccordion;
