import { QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import InputContext from "./InputContext";
import InputError from "./InputError";

export interface FieldsetProps {
  /** The text for the legend element. */
  legend: string;
  /** The name of this form control. */
  name?: string;
  /** Controls whether Required or Optional text appears above the fieldset. */
  required?: boolean;
  /** If an error string is provided, it will appear below the fieldset inputs. */
  error?: string;
  /** If a context string is provided, a small button will appear which, when toggled, shows the context string. */
  context?: string;
  /** If true, all input elements in this fieldset will be disabled. */
  disabled?: boolean;
  /** If true, and required is false, 'Optional' will not be shown above the fieldset. */
  hideOptional?: boolean;
}

export const Fieldset: React.FC<FieldsetProps> = ({
  legend,
  name,
  required,
  error,
  context,
  disabled,
  hideOptional,
  children,
}) => {
  const [contextIsActive, setContextIsActive] = useState(false);
  return (
    <fieldset
      name={name}
      disabled={disabled}
      style={{
        border: "0 none",
      }}
    >
      <div data-h2-flex-grid="b(middle, contained, flush, none)">
        <div data-h2-flex-item="b(1of1) s(1of2)" data-h2-text-align="b(left)">
          <legend data-h2-font-size="b(caption)">{legend}</legend>
        </div>
        <div
          data-h2-flex-item="b(1of1) s(1of2)"
          data-h2-text-align="b(left) s(right)"
        >
          {
            /** If hideOptional is true, only show text if required is true. */
            (required || !hideOptional) && (
              <span
                data-h2-font-size="b(caption)"
                data-h2-font-color={required ? "b(red)" : "b(darkgray)"}
              >
                {required ? "Required" : "Optional"}
              </span>
            )
          }
          {context && (
            <button
              type="button"
              className="input-label-context-button"
              data-h2-margin="b(left, xxs)"
              title="Toggle Context"
              onClick={() =>
                setContextIsActive((currentState) => !currentState)
              }
            >
              <>
                {contextIsActive ? (
                  <XCircleIcon
                    style={{ width: "calc(1rem/1.25)" }}
                    data-h2-font-color="b(lightpurple)"
                  />
                ) : (
                  <QuestionMarkCircleIcon
                    style={{ width: "calc(1rem/1.25)" }}
                    data-h2-font-color="b(lightpurple)"
                  />
                )}
              </>
            </button>
          )}
        </div>
      </div>
      <div
        data-h2-border="b(darkgray, all, solid, s)"
        data-h2-radius="b(s)"
        data-h2-padding="b(right-left, s) b(top-bottom, xs)"
        // data-h2-margin="b(top, xxs)"
      >
        {children}
      </div>
      {error && (
        <div data-h2-display="block" data-h2-margin="b(top, xxs)">
          <InputError isVisible={!!error} error={error} />
        </div>
      )}
      {contextIsActive && context && (
        <div data-h2-display="block" data-h2-margin="b(top, xxs)">
          <InputContext
            isVisible={contextIsActive && !!context}
            context={context}
          />
        </div>
      )}
    </fieldset>
  );
};

export default Fieldset;
