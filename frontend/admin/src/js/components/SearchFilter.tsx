import React from "react";
import Dialog from "@common/components/Dialog";
import { Button } from "@common/components";
import { FormattedMessage, useIntl } from "react-intl";
import { BasicForm } from "@common/components/form";
import SelectFieldV2 from "@common/components/form/Select/SelectFieldV2";
import MultiSelectFieldV2 from "@common/components/form/MultiSelect/MultiSelectFieldV2";
import "./SearchFilter.css";
import { useFormContext } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { Option } from "@common/components/form/Select/SelectFieldV2";
import useSearchFilterOptions from "./useSearchFilterOptions";

export type FormValues = {
  pools: Option["value"][];
  languages: Option["value"][];
  classifications: Option["value"][];
  workPreferences: Option["value"][];
  workLocations: Option["value"][];
  durationPreferences: Option["value"][];
  availability: Option["value"][];
  skillFilter: Option["value"][];
  profileComplete: Option["value"][];
  govEmployee: Option["value"][];
};

const SearchFilterFooter = (): JSX.Element => {
  const { reset } = useFormContext();
  const { emptyFormValues } = useSearchFilterOptions();
  const handleClear = () => {
    reset(emptyFormValues);
  };

  return (
    <div style={{ display: "flex", placeContent: "space-between" }}>
      <Button color="secondary" mode="outline" onClick={handleClear}>
        <FormattedMessage
          description="Clear button within the search filter dialog"
          defaultMessage="Clear filters"
        />
      </Button>
      <Button type="submit" color="cta">
        <FormattedMessage
          description="Submit button within the search filter dialog"
          defaultMessage="Show results"
        />
      </Button>
    </div>
  );
};

interface SearchFilterProps {
  isOpen: boolean;
  onDismiss: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onSubmit: SubmitHandler<FormValues>;
  activeFilters: FormValues;
}

const SearchFilter = ({
  isOpen,
  onDismiss,
  onSubmit,
  activeFilters,
}: SearchFilterProps): JSX.Element => {
  const { formatMessage } = useIntl();
  const { optionsData } = useSearchFilterOptions();

  return (
    <Dialog
      {...{ isOpen, onDismiss }}
      title={formatMessage({
        defaultMessage: "Select filters",
        description: "Candidate search filter dialog: title",
      })}
      subtitle={formatMessage({
        defaultMessage:
          "Narrow down your table results using the following filters.",
        description: "Candidate search filter dialog: subtitle",
      })}
    >
      <BasicForm
        {...{ onSubmit }}
        options={{
          defaultValues: activeFilters,
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <MultiSelectFieldV2
              id="pools"
              label={formatMessage({
                defaultMessage: "Pools",
              })}
              options={optionsData.pools}
            />
          </div>
          <div style={{ minWidth: 300, marginLeft: 20 }}>
            <SelectFieldV2
              forceArrayFormValue
              id="languages"
              label={formatMessage({
                defaultMessage: "Languages",
              })}
              options={optionsData.languages}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1, minWidth: 175 }}>
            <MultiSelectFieldV2
              id="classifications"
              label={formatMessage({
                defaultMessage: "Classifications",
              })}
              options={optionsData.classifications}
            />
          </div>
          <div style={{ flexGrow: 1, marginLeft: 20 }}>
            <MultiSelectFieldV2
              id="workPreferences"
              label={formatMessage({
                defaultMessage: "Work Preferences",
              })}
              options={optionsData.workPreferences}
            />
          </div>
          <div style={{ flexGrow: 1, marginLeft: 20 }}>
            <MultiSelectFieldV2
              id="workLocations"
              label={formatMessage({
                defaultMessage: "Work Locations",
              })}
              options={optionsData.workLocations}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <SelectFieldV2
              forceArrayFormValue
              id="durationPreferences"
              label={formatMessage({
                defaultMessage: "Duration Preferences",
              })}
              options={optionsData.durationPreferences}
            />
          </div>
          <div style={{ flexGrow: 1, marginLeft: 20 }}>
            <MultiSelectFieldV2
              id="availability"
              label={formatMessage({
                defaultMessage: "Availability",
              })}
              options={optionsData.availability}
            />
          </div>
          <div style={{ marginLeft: 20 }}>
            <SelectFieldV2
              forceArrayFormValue
              id="profileComplete"
              label={formatMessage({
                defaultMessage: "Profile Complete",
              })}
              options={optionsData.profileComplete}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <MultiSelectFieldV2
              id="skillFilter"
              label={formatMessage({
                defaultMessage: "Skill Filter",
              })}
              options={optionsData.skillFilter}
            />
          </div>
          <div style={{ marginLeft: 20 }}>
            <SelectFieldV2
              forceArrayFormValue
              id="govEmployee"
              label={formatMessage({
                defaultMessage: "Government Employee",
              })}
              options={optionsData.govEmployee}
            />
          </div>
        </div>
        <Dialog.Footer>
          <SearchFilterFooter />
        </Dialog.Footer>
      </BasicForm>
    </Dialog>
  );
};

export default SearchFilter;
