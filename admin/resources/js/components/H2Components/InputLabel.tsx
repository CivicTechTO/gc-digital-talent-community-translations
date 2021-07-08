import React, { useState } from "react";
import { QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/solid";

export interface InputLabelProps {
  id: string;
  label: string;
  required: boolean;
  contextIsVisible?: boolean;
  contextClickHandler?: (contextIsActive: boolean) => void;
}

const InputLabel: React.FC<InputLabelProps> = ({
  id,
  label,
  required,
  contextClickHandler = () => {
    /* returns nothing */
  },
  contextIsVisible = false,
}): React.ReactElement => {
  const [contextIsActive, setContextIsActive] = useState(false);
  const clickHandler = () => {
    contextClickHandler(!contextIsActive);
    setContextIsActive((currentState) => !currentState);
  };
  return (
    <div
      data-h2-flex-grid="b(middle, contained, flush, none)"
      data-h2-font-family="b(sans)"
    >
      <div data-h2-flex-item="b(1of1) s(1of2)" data-h2-text-align="b(left)">
        <label htmlFor={id}>{label}</label>
      </div>
      <div
        data-h2-flex-item="b(1of1) s(1of2)"
        data-h2-text-align="b(left) s(right)"
      >
        <span data-h2-font-color={required ? "b(red)" : "b(darkgray)"}>
          {required ? "Required" : "Optional"}
        </span>
        {contextIsVisible && (
          <button
            type="button"
            className="input-label-context-button"
            data-h2-margin="b(left, xxs)"
            title="Toggle Context"
            onClick={clickHandler}
          >
            <>
              {contextIsActive ? (
                <QuestionMarkCircleIcon
                  style={{ width: "1rem" }}
                  data-h2-font-color="b(lightpurple)"
                />
              ) : (
                <XCircleIcon
                  style={{ width: "1rem" }}
                  data-h2-font-color="b(lightpurple)"
                />
              )}
            </>
          </button>
        )}
      </div>
    </div>
  );
};

export default InputLabel;
