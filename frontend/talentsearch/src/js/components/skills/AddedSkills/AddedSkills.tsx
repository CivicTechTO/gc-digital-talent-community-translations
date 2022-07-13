import React from "react";
import { useIntl } from "react-intl";
import Chip, { Chips } from "@common/components/Chip";
import { Scalars, Skill } from "@common/api/generated";
import { getLocale } from "@common/helpers/localize";
import { notEmpty } from "@common/helpers/util";

export interface AddedSkillsProps {
  skills: Skill[];
  onRemoveSkill: (id: Scalars["ID"]) => void;
}

const strong = (child: HTMLElement) => <strong>{child}</strong>;

const AddedSkills: React.FunctionComponent<AddedSkillsProps> = ({
  skills,
  onRemoveSkill,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl);

  const filteredSkills = skills.filter((s) => typeof s !== "undefined");

  return (
    <>
      <h3 data-h2-font-size="base(h5, 1.3)">
        {intl.formatMessage({
          defaultMessage: "Skills attached to this experience",
          description:
            "Section header for a list of skills attached to this experience",
        })}
      </h3>
      {notEmpty(filteredSkills) ? (
        <Chips>
          {filteredSkills.map((skill) => {
            const handleDismiss = () => onRemoveSkill(skill.id);
            return (
              <Chip
                key={skill?.id}
                label={skill?.name?.[locale] ?? "Missing Name"}
                color="neutral"
                mode="outline"
                onDismiss={handleDismiss}
              />
            );
          })}
        </Chips>
      ) : null}
      {filteredSkills.length === 0 && (
        <i>
          {intl.formatMessage({
            defaultMessage:
              "There are no skills attached to this experience yet. You can add some using the links below.",
            description:
              "Invitation to add skills when there aren't any added yet.",
          })}
        </i>
      )}

      {filteredSkills.length >= 6 && (
        <div
          data-h2-border="base(all, 1px, solid, dt-accent)"
          data-h2-background-color="base(dt-accent.1)"
          data-h2-padding="base(x.5)"
          data-h2-radius="base(s)"
          data-h2-color="base(darker.dt-accent)"
          role="alert"
        >
          <i>
            <div>
              <strong>
                {intl.formatMessage({
                  defaultMessage: "That's a lot of skills!",
                  description:
                    "Title of alert when there are many skills added.",
                })}
              </strong>
            </div>
            <div>
              {intl.formatMessage(
                {
                  defaultMessage:
                    "On the next step you will explain how you used each skill. Try to focus on a few of your top skills, we recommend <strong>less than six (6)</strong> skills per experience.",
                  description:
                    "Message of alert when there are many skills added recommending that fewer skills be selected.",
                },
                {
                  strong,
                },
              )}
            </div>
          </i>
        </div>
      )}
    </>
  );
};

export default AddedSkills;
