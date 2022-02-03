import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { usePaginationVars } from ".";
import { Skill } from "../../api/generated";
import { fakeSkills } from "../../fakeData";
import Pagination, { PaginationProps } from "./Pagination";

export default {
  component: Pagination,
  title: "Components/Pagination",
  args: {
    handlePageChange: action("Change page"),
  },
} as Meta;

const TemplatePagination: Story<PaginationProps> = (args) => {
  return <Pagination {...args} />;
};

const Default = TemplatePagination.bind({});
export const NoDots = TemplatePagination.bind({});
export const RightDots = TemplatePagination.bind({});
export const LeftDots = TemplatePagination.bind({});
export const BothDots = TemplatePagination.bind({});

Default.args = {
  totalCount: 100,
  siblingCount: 1,
  currentPage: 1,
  pageSize: 10,
};

NoDots.args = {
  ...Default.args,
  totalCount: 50,
};

RightDots.args = {
  ...Default.args,
};

LeftDots.args = {
  ...Default.args,
  currentPage: 9,
};

BothDots.args = {
  ...Default.args,
  currentPage: 5,
};

const TemplatePaginationWithData: Story<PaginationProps> = () => {
  const skills = fakeSkills(50);
  const pageSize = 5;
  const pagination = usePaginationVars<Skill>(1, pageSize, skills);
  const { currentPage, currentTableData, setCurrentPage } = pagination;
  return (
    <div>
      {currentTableData.map((skill) => (
        <p key={skill.key}>{skill.name.en}</p>
      ))}
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        siblingCount={1}
        totalCount={skills.length}
        handlePageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export const WithData = TemplatePaginationWithData.bind({});
