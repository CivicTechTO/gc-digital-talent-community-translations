/**
 * @jest-environment jsdom
 */

import React from "react";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { render, axeTest, screen, fireEvent } from "../../helpers/testUtils";

import Accordion from ".";

type AccordionRootPrimitivePropsWithoutRef = React.ComponentPropsWithoutRef<
  typeof Accordion.Root
>;

function renderAccordion({
  children,
  ...rest
}: AccordionRootPrimitivePropsWithoutRef) {
  return render(<Accordion.Root {...rest}>{children}</Accordion.Root>);
}

const Text = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate urna
    quam, id lacinia mauris condimentum molestie. Interdum et malesuada fames ac
    ante ipsum primis in faucibus. Sed porttitor, elit vel consequat efficitur,
    est sapien rhoncus mi, nec maximus libero augue a nisi. Vivamus et turpis
    non magna tincidunt vulputate non tristique libero.
  </p>
);

const DefaultChildren = () => (
  <>
    <Accordion.Item value="one">
      <Accordion.Trigger Icon={AcademicCapIcon} subtitle="Subtitle">
        Accordion One
      </Accordion.Trigger>
      <Accordion.Content>
        <Text />
      </Accordion.Content>
    </Accordion.Item>{" "}
    <Accordion.Item value="two">
      <Accordion.Trigger Icon={AcademicCapIcon} subtitle="Subtitle">
        Accordion Two
      </Accordion.Trigger>
      <Accordion.Content>
        <Text />
      </Accordion.Content>
    </Accordion.Item>
  </>
);

describe("Accordion", () => {
  it("should not have accessibility errors when single", async () => {
    const { container } = renderAccordion({
      type: "single",
      children: <DefaultChildren />,
    });
    await axeTest(container);
  });

  it("should not have accessibility errors when multiple", async () => {
    const { container } = renderAccordion({
      type: "single",
      children: <DefaultChildren />,
    });
    await axeTest(container);
  });

  it("should should only open one when single", async () => {
    renderAccordion({
      type: "single",
      children: <DefaultChildren />,
    });

    expect(
      await screen.getAllByRole("button", { expanded: false }),
    ).toHaveLength(2);

    fireEvent.click(await screen.getByRole("button", { name: /one/i }));
    fireEvent.click(await screen.getByRole("button", { name: /two/i }));

    expect(
      await screen.getAllByRole("button", { expanded: false }),
    ).toHaveLength(1);
    expect(
      await screen.getAllByRole("button", { expanded: true }),
    ).toHaveLength(1);
  });

  it("should should open two when multiple", async () => {
    renderAccordion({
      type: "multiple",
      children: <DefaultChildren />,
    });

    expect(
      await screen.getAllByRole("button", { expanded: false }),
    ).toHaveLength(2);

    fireEvent.click(await screen.getByRole("button", { name: /one/i }));
    fireEvent.click(await screen.getByRole("button", { name: /two/i }));

    expect(
      await screen.getAllByRole("button", { expanded: true }),
    ).toHaveLength(2);
  });
});