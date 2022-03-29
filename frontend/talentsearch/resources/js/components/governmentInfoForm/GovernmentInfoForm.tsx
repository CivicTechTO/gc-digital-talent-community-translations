import React from "react";
import { useIntl } from "react-intl";
import {
  useWatch,
  SubmitHandler,
  FormProvider,
  useForm,
} from "react-hook-form";
import { errorMessages } from "@common/messages";
import { Checkbox, RadioGroup, Select } from "@common/components/form";
import { getLocale } from "@common/helpers/localize";
import Form from "@common/components/form/BasicForm";
import { fakeClassifications } from "@common/fakeData";
import { toast } from "react-toastify";
import { notEmpty } from "@common/helpers/util";
import {
  Classification,
  useGetAllClassificationsQuery,
  useUpdateGovAsUserMutation,
  UpdateUserAsUserInput,
  UpdateGovAsUserMutation,
  useGetMeGovernmentInfoQuery,
} from "../../api/generated";
import ProfileFormWrapper from "../applicantProfile/ProfileFormWrapper";
import ProfileFormFooter from "../applicantProfile/ProfileFormFooter";

type FormValues = Pick<
  UpdateUserAsUserInput,
  "isGovEmployee" | "interestedInLaterOrSecondment" | "currentClassification"
>;
type FormContentTyping = {
  govEmployeeYesNo: string;
  govEmployeeType: string;
  lateralDeployBool: boolean;
  currentClassificationGroup: string;
  currentClassificationLevel: string;
};

// inner component
export const GovernmentInfoForm: React.FunctionComponent<{
  classifications: Classification[];
  storedValues: {
    isGovEmployee?: boolean | null | undefined;
    interestedInLaterOrSecondment?: boolean | null | undefined;
    currentClassification?: {
      group?: string | null | undefined;
      level?: number | null | undefined;
    };
  };
  // saveThingy: any;
}> = ({ classifications, storedValues /* , saveThingy */ }) => {
  const intl = useIntl();
  const locale = getLocale(intl);

  // hooks to watch, needed for conditional rendering
  const govEmployee = useWatch({
    name: "gov-employee-yesno",
  });
  const govEmployeeStatus = useWatch({
    name: "gov-employee-status",
    defaultValue: "student",
  });
  const groupSelection = useWatch({
    name: "class-group",
    defaultValue: "Choose Department",
  });

  // create array of objects containing the classifications, then map it into an array of strings, and then remove duplicates, and then map into Select options
  // https://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array#comment87157537_42123984
  const classGroupsWithDupes: { value: string; label: string }[] =
    classifications.map((iterator) => {
      return {
        value: iterator.id,
        label:
          iterator.group ||
          intl.formatMessage({
            defaultMessage: "Error: classification group not found.",
            description:
              "Error message if classification group is not defined.",
          }),
      };
    });
  const mapped = classGroupsWithDupes.map((x) => x.label);
  const noDupes = Array.from(new Set(mapped));
  const groupOptions = noDupes.map((iterator) => {
    return { value: iterator, label: iterator };
  });

  // generate classification levels from the selected group
  const filteredArray = classifications.filter(
    (x) => x.group === groupSelection,
  );
  const levelOptions = filteredArray.map((iterator) => {
    return {
      value: iterator.level.toString(),
      label: iterator.level.toString(),
    };
  });

  // render the actual form
  return (
    <div>
      <div data-h2-flex-item="b(1of1) s(1of2) m(1of6) l(1of12)">
        <RadioGroup
          idPrefix="gov-employee-yesno"
          legend={intl.formatMessage({
            defaultMessage: "GoC Employee Status",
            description: "Employee Status in Government Info Form",
          })}
          name="gov-employee-yesno"
          rules={{ required: intl.formatMessage(errorMessages.required) }}
          defaultSelected="no"
          // defaultSelected={storedValues.isGovEmployee ? "yes" : "no"}
          items={[
            {
              value: "no",
              label: intl.formatMessage({
                defaultMessage: "No, I am not a Government of Canada employee",
                description:
                  "Label displayed for is not a government employee option",
              }),
            },
            {
              value: "yes",
              label: intl.formatMessage({
                defaultMessage: "Yes, I am a Government of Canada employee",
                description:
                  "Label displayed for is a government employee option",
              }),
            },
          ]}
        />
      </div>
      <div data-h2-padding="b(top-bottom, m)" data-h2-flex-item="b(1of3)">
        {" "}
        {govEmployee === "yes" && (
          <RadioGroup
            idPrefix="gov-employee-status"
            legend={intl.formatMessage({
              defaultMessage: "GoC Employee Status",
              description: "Employee Status in Government Info Form",
            })}
            name="gov-employee-status"
            rules={{ required: intl.formatMessage(errorMessages.required) }}
            defaultSelected="student"
            items={[
              {
                value: "student",
                label: intl.formatMessage({
                  defaultMessage: "I am a student",
                  description: "Label displayed for student option",
                }),
              },
              {
                value: "casual",
                label: intl.formatMessage({
                  defaultMessage: "I have a  casual contract",
                  description: "Label displayed for casual option",
                }),
              },
              {
                value: "term",
                label: intl.formatMessage({
                  defaultMessage: "I have a term position",
                  description: "Label displayed for term option",
                }),
              },
              {
                value: "indeterminate",
                label: intl.formatMessage({
                  defaultMessage: "I have a indeterminate position",
                  description: "Label displayed for indeterminate option",
                }),
              },
            ]}
          />
        )}
      </div>
      {govEmployee === "yes" &&
        (govEmployeeStatus === "term" ||
          govEmployeeStatus === "indeterminate") && (
          <p>
            {intl.formatMessage({
              defaultMessage:
                "Please indicate if you are interested in lateral deployment or secondment. Learn more about this.",
              description:
                "Text blurb, asking about interest in deployment/secondment in the government info form",
            })}
          </p>
        )}
      <div data-h2-padding="b(bottom, m)">
        {govEmployee === "yes" &&
          (govEmployeeStatus === "term" ||
            govEmployeeStatus === "indeterminate") && (
            <Checkbox
              id="lateral-second"
              label={intl.formatMessage({
                defaultMessage:
                  "I am interested in lateral deployment or secondment.",
                description: "Label displayed on lateral/secondment checkbox",
              })}
              name="lateral-second"
              boundingBox
              boundingBoxLabel="Lateral Deployment"
              // defaultChecked={!!storedValues.interestedInLaterOrSecondment}
            />
          )}
      </div>
      {govEmployee === "yes" &&
        (govEmployeeStatus === "term" ||
          govEmployeeStatus === "indeterminate" ||
          govEmployeeStatus === "casual") && (
          <p>
            {intl.formatMessage({
              defaultMessage:
                "Please indicate your current substantive group classification and level.",
              description:
                "Text blurb, asking about classification and level in the government info form",
            })}
          </p>
        )}
      <div data-h2-display="b(flex)">
        <div data-h2-padding="b(right, l)">
          {govEmployee === "yes" &&
            (govEmployeeStatus === "term" ||
              govEmployeeStatus === "indeterminate" ||
              govEmployeeStatus === "casual") && (
              <Select
                id="class-group"
                label={intl.formatMessage({
                  defaultMessage: "Current Classification Group",
                  description: "Label displayed on classification group input",
                })}
                name="class-group"
                nullSelection={intl.formatMessage({
                  defaultMessage: "Choose Group",
                  description: "Null selection for form.",
                })}
                rules={{ required: intl.formatMessage(errorMessages.required) }}
                options={groupOptions}
                // defaultValue={
                //   storedValues.currentClassification?.group
                //     ? `${storedValues.currentClassification.group}`
                //     : "Choose Group"
                // }
              />
            )}
        </div>
        <div>
          {govEmployee === "yes" &&
            (govEmployeeStatus === "term" ||
              govEmployeeStatus === "indeterminate" ||
              govEmployeeStatus === "casual") &&
            groupSelection !== "Choose Department" && (
              <Select
                id="class-level"
                label={intl.formatMessage({
                  defaultMessage: "Current Classification Level",
                  description: "Label displayed on classification level input",
                })}
                name="class-level"
                rules={{
                  required: intl.formatMessage(errorMessages.required),
                }}
                nullSelection={intl.formatMessage({
                  defaultMessage: "Choose Level",
                  description: "Null selection for form.",
                })}
                options={levelOptions}
                // defaultValue={
                //   storedValues.currentClassification?.level
                //     ? `${storedValues.currentClassification.level}`
                //     : "Choose Level"
                // }
              />
            )}
        </div>
      </div>
    </div>
  );
};

// outer, containing component
export const GovInfoFormContainer: React.FunctionComponent = () => {
  // const fakes = fakeClassifications();
  const intl = useIntl();
  const methods = useForm<FormValues>();
  const { handleSubmit, watch } = methods;
  // acquire classifications from graphQL to pass into component to render
  const [lookUpResult] = useGetAllClassificationsQuery();
  const {
    data: lookupData,
    fetching: fetchingLookupData,
    error: lookupDataError,
  } = lookUpResult;
  const classifications: Classification[] | [] =
    lookupData?.classifications.filter(notEmpty) ?? [];

  // acquire prior info if applicable, including id of "me"
  const callGetMeQuery = useGetMeGovernmentInfoQuery();
  const holder = callGetMeQuery[0].data?.me;
  const previousData = {
    isGovEmployee: holder?.isGovEmployee,
    interestedInLaterOrSecondment: holder?.interestedInLaterOrSecondment,
    currentClassification: {
      group: holder?.currentClassification?.group,
      level: holder?.currentClassification?.level,
    },
  };

  // submitting the form component values back out to graphQL
  const [, executeMutation] = useUpdateGovAsUserMutation();
  const handleUpdateUser = (id: string, data: UpdateUserAsUserInput) =>
    executeMutation({
      id,
      user: data,
    }).then((result) => {
      console.log("Stamp 4");
      if (result.data?.updateUserAsUser) {
        return result.data.updateUserAsUser;
      }
      return Promise.reject(result.error);
    });
  const formValuesToSubmitData = (
    values: FormValues,
  ): UpdateUserAsUserInput => ({
    ...values,
  });
  const id = holder ? holder.id : "";
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    console.log("Stamp 1");
    console.log(data);
    await handleUpdateUser(id, formValuesToSubmitData(data))
      .then(() => {
        console.log("Stamp 2");
        toast.success(
          intl.formatMessage({
            defaultMessage: "User updated successfully!",
            description:
              "Message displayed to user after user is updated successfully.",
          }),
        );
      })
      .catch(() => {
        console.log("Stamp 3");
        toast.error(
          intl.formatMessage({
            defaultMessage: "Error: updating user failed",
            description:
              "Message displayed to user after user fails to get updated.",
          }),
        );
      });
  };

  return (
    <ProfileFormWrapper
      description={intl.formatMessage({
        defaultMessage:
          "Please indicate if you are currently an employee in the Government of Canada.",
        description:
          "Description blurb for Profile Form Wrapper in the Government Information Form",
      })}
      title={intl.formatMessage({
        defaultMessage: "Government Information",
        description:
          "Title for Profile Form Wrapper in Government Information Form",
      })}
      crumbs={[
        {
          title: intl.formatMessage({
            defaultMessage: "Government Information",
            description:
              "Display Text for Government Information Form Page Link",
          }),
        },
      ]}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GovernmentInfoForm
            classifications={classifications}
            storedValues={previousData}
            // saveThingy={onSubmit}
          />
          <ProfileFormFooter
            mode="saveButton"
            handleSave={handleSubmit(onSubmit)}
          />
        </form>
      </FormProvider>
    </ProfileFormWrapper>
  );
};

export default GovInfoFormContainer;
