/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import { IntlProvider, MessageFormatElement, useIntl } from "react-intl";
import GovInfoFormContainer from "./GovernmentInfoForm";

const renderWithReactIntl = (
  component: React.ReactNode,
  locale?: "en" | "fr",
  messages?: Record<string, string> | Record<string, MessageFormatElement[]>,
) => {
  return (
    <IntlProvider locale={locale || "en"} messages={messages}>
      {component}
    </IntlProvider>
  );
};

let container: HTMLDivElement;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

jest.setTimeout(15000);

test("Test form display rendering", async () => {
  // timeout for hopefully things to load first then test?
  act(() => {
    render(renderWithReactIntl(<GovInfoFormContainer />));
  });
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 5000));

  const button = screen.getByText("Yes, I am a Government of Canada employee");
  const studentNotPresent = screen.queryByText("I am a student");
  expect(studentNotPresent).toBeNull();
  fireEvent.click(button); // Open the second form
  expect(screen.getByText("I am a student")).toBeTruthy();

  const button2 = screen.getByText("I have a term position");
  fireEvent.click(button2); // Open the other forms
  expect(
    screen.getByText(
      "Please indicate if you are interested in lateral deployment or secondment. Learn more about this.",
    ),
  ).toBeTruthy();
  expect(screen.getByText("Current Classification Group")).toBeTruthy();
});

test("Test form data", async () => {
  act(() => {
    render(renderWithReactIntl(<GovInfoFormContainer />));
  });
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 5000));

  const button = screen.getByText("Yes, I am a Government of Canada employee");
  fireEvent.click(button); // Open the second form

  const button2 = screen.getByText("I have a term position");
  fireEvent.click(button2); // Open the other forms

  const button3 = screen.getByLabelText("Current Classification Group");
});
