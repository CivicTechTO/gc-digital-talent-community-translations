import React from "react";
import { Story, Meta } from "@storybook/react";
import { generators } from "@common/fakeData/fakeExperiences";
import { Applicant } from "@common/api/generated";
import ExperienceAccordion, { AccordionProps } from "./ExperienceAccordion";

// required to define for unknown experience instance
const sampleApp: Applicant = { email: "blank", id: "blank" };
const theId = "blank";

export default {
  component: ExperienceAccordion,
  title: "Experience Accordion",
  args: {},
} as Meta;

const AccordionTemplate: Story<AccordionProps> = (args) => {
  return <ExperienceAccordion {...args} />;
};

export const AccordionAwardExample = AccordionTemplate.bind({});
export const AccordionCommunityExample = AccordionTemplate.bind({});
export const AccordionEducationExample = AccordionTemplate.bind({});
export const AccordionPersonalExample = AccordionTemplate.bind({});
export const AccordionWorkExample = AccordionTemplate.bind({});
export const AccordionUnknownExample = AccordionTemplate.bind({});

AccordionAwardExample.args = {
  experience: generators.awardExperiences()[1],
};

AccordionCommunityExample.args = {
  experience: generators.communityExperiences()[1],
};

AccordionEducationExample.args = {
  experience: generators.educationExperiences()[1],
};

AccordionPersonalExample.args = {
  experience: generators.personalExperiences()[1],
};

AccordionWorkExample.args = {
  experience: generators.workExperiences()[1],
};

AccordionUnknownExample.args = {
  experience: {
    applicant: sampleApp,
    id: theId,
    experienceSkills: [],
  },
};
