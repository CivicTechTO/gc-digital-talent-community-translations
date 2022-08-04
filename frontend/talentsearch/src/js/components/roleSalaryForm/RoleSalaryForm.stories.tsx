import React from "react";
import type { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { GenericJobTitleKey } from "@common/api/generated";
import { RoleSalaryForm } from "./RoleSalaryForm";

export default {
  component: RoleSalaryForm,
  title: "Role Salary Expectation Form",
} as Meta;

const TemplateRoleSalaryForm: Story = (args) => {
  const { userId, initialFormValues, handleSubmit } = args;
  return (
    <RoleSalaryForm
      userId={userId}
      initialFormValues={initialFormValues}
      handleSubmit={handleSubmit}
    />
  );
};
export const formEmpty = TemplateRoleSalaryForm.bind({});
export const formSomeSelected = TemplateRoleSalaryForm.bind({});

formEmpty.args = {
  userId: "user-id",
  initialFormValues: { expectedGenericJobTitles: [] },
  handleSubmit: action("handleSubmit"),
};

formSomeSelected.args = {
  ...formEmpty.args,
  initialFormValues: {
    expectedGenericJobTitles: [
      GenericJobTitleKey.AnalystIt02,
      GenericJobTitleKey.TechnicalAdvisorIt03,
    ],
  },
};
