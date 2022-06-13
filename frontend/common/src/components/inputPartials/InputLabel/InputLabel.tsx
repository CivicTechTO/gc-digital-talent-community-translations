import React, { useState } from "react";
import { QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { useIntl } from "react-intl";
import { commonMessages } from "../../../messages";

export interface InputLabelProps {
  inputId: string;
  label: string | React.ReactNode;
  required: boolean;
  contextIsVisible?: boolean;
  contextToggleHandler?: (contextIsActive: boolean) => void;
  hideOptional?: boolean;
}

const InputLabel: React.FC<InputLabelProps> = ({
  inputId,
  label,
  required,
  contextToggleHandler = () => {
    /* returns nothing */
  },
  contextIsVisible = false,
  hideOptional = false,
}): React.ReactElement => {
  const [contextIsActive, setContextIsActive] = useState(false);
  const clickHandler = () => {
    contextToggleHandler(!contextIsActive);
    setContextIsActive((currentState) => !currentState);
  };
  const intl = useIntl();
  return (
    <div
      data-h2-display="b(flex)"
      data-h2-flex-wrap="b(wrap)"
      data-h2-margin="b(0, 0, x.125, 0)"
    >
      <div style={{ flex: "1" }}>
        <label data-h2-font-size="b(caption)" htmlFor={inputId}>
          {label}
        </label>
      </div>
      <div>
        {
          /** If hideOptional is true, only show text if required is true. */
          (required || !hideOptional) && (
            <span
              data-h2-font-size="b(caption)"
              {...(required
                ? { "data-h2-color": "b(dt-error)" }
                : { "data-h2-color": "b(dark.dt-gray)" })}
            >
              {required
                ? intl.formatMessage(commonMessages.required)
                : intl.formatMessage(commonMessages.optional)}
            </span>
          )
        }
        {contextIsVisible && (
          <button
            type="button"
            className="input-label-context-button"
            data-h2-margin="b(0, 0, 0, x.125)"
            onClick={clickHandler}
          >
            <span data-h2-visibility="b(invisible)">
              {intl.formatMessage({
                defaultMessage: "Toggle context",
                description:
                  "Label to toggle the context description of an input.",
              })}
            </span>
            {contextIsActive ? (
              <XCircleIcon
                style={{ width: "calc(1rem/1.25)" }}
                data-h2-color="b(dt-primary)"
              />
            ) : (
              <QuestionMarkCircleIcon
                style={{ width: "calc(1rem/1.25)" }}
                data-h2-color="b(dt-primary)"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputLabel;
