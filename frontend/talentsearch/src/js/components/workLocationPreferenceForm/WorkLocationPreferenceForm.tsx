import { BasicForm, Checklist, TextArea } from "@common/components/form";
import { getWorkRegionsDetailed } from "@common/constants/localizedConstants";
import { enumToOptions } from "@common/helpers/formUtils";
import { getLocale } from "@common/helpers/localize";
import { navigate } from "@common/helpers/router";
import { checkFeatureFlag } from "@common/helpers/runtimeVariable";
import { errorMessages, navigationMessages } from "@common/messages";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import {
  CreateUserInput,
  CreateWorkLocationPreferenceMutation,
  WorkRegion,
  UpdateUserAsUserInput,
  User,
  PoolCandidate,
} from "../../api/generated";
import applicantProfileRoutes from "../../applicantProfileRoutes";
import directIntakeRoutes from "../../directIntakeRoutes";
import ProfileFormFooter from "../applicantProfile/ProfileFormFooter";
import ProfileFormWrapper from "../applicantProfile/ProfileFormWrapper";
import getFullPoolAdvertisementTitle from "../pool/getFullPoolAdvertisementTitle";
import profileMessages from "../profile/profileMessages";

export type FormValues = Pick<
  CreateUserInput,
  "locationPreferences" | "locationExemptions"
>;
export interface WorkLocationPreferenceFormProps {
  initialData: User;
  application?: PoolCandidate;
  handleWorkLocationPreference: (
    id: string,
    data: UpdateUserAsUserInput,
  ) => Promise<CreateWorkLocationPreferenceMutation["updateUserAsUser"]>;
}

export const WorkLocationPreferenceForm: React.FC<
  WorkLocationPreferenceFormProps
> = ({ initialData, application, handleWorkLocationPreference }) => {
  const intl = useIntl();
  const locale = getLocale(intl);
  const profilePaths = applicantProfileRoutes(locale);
  const directIntakePaths = directIntakeRoutes(locale);
  const returnRoute =
    application && checkFeatureFlag("FEATURE_DIRECTINTAKE")
      ? directIntakePaths.reviewApplication(application.id)
      : profilePaths.home(initialData.id);

  const labels = {
    locationPreferences: intl.formatMessage({
      defaultMessage: "Work location",
      id: "nueuS8",
      description:
        "Legend for optional work preferences check list in work preferences form",
    }),
    locationExemptions: intl.formatMessage({
      defaultMessage: "Location exemptions",
      id: "0qNkIp",
      description:
        "Location Exemptions field label for work location preference form",
    }),
  };

  const dataToFormValues = (data: User): FormValues => ({
    ...data,
    locationPreferences: data.locationPreferences,
    locationExemptions: data.locationExemptions,
  });
  const formValuesToSubmitData = (
    values: FormValues,
  ): UpdateUserAsUserInput => ({
    locationPreferences: values.locationPreferences,
    locationExemptions: values.locationExemptions,
  });

  const handleSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    await handleWorkLocationPreference(
      initialData.id,
      formValuesToSubmitData(data),
    )
      .then(() => {
        navigate(returnRoute);
        toast.success(intl.formatMessage(profileMessages.userUpdated));
      })
      .catch(() => {
        toast.error(intl.formatMessage(profileMessages.updatingFailed));
      });
  };

  const applicationBreadcrumbs = application
    ? [
        {
          title: intl.formatMessage({
            defaultMessage: "My Applications",
            id: "mq4G8h",
            description:
              "'My Applications' breadcrumb from applicant profile wrapper.",
          }),
          href: directIntakePaths.applications(application.user.id),
          icon: <BriefcaseIcon style={{ width: "1rem", marginRight: "5px" }} />,
        },
        {
          title: getFullPoolAdvertisementTitle(
            intl,
            application.poolAdvertisement,
          ),
          href: directIntakePaths.pool(application.pool.id),
        },
        {
          href: directIntakePaths.reviewApplication(application.id),
          title: intl.formatMessage(navigationMessages.stepOne),
        },
      ]
    : [];

  return (
    <ProfileFormWrapper
      description={intl.formatMessage({
        defaultMessage:
          "Indicate all locations where you are willing to work, including your current location (if you are interested in working there).",
        id: "8NJbCH",
        description:
          "Description text for Profile Form wrapper in Work Location Preferences Form",
      })}
      title={intl.formatMessage({
        defaultMessage: "Work location",
        id: "nOE+8s",
        description:
          "Title for Profile Form wrapper  in Work Location Preferences Form",
      })}
      cancelLink={{
        href: returnRoute,
      }}
      crumbs={[
        ...applicationBreadcrumbs,
        {
          title: intl.formatMessage({
            defaultMessage: "Work Location Preference",
            id: "c/Qp8R",
            description:
              "Display Text for the current page in Work Location Preference Form Page",
          }),
        },
      ]}
      prefixBreadcrumbs={!application}
    >
      <BasicForm
        cacheKey="work-location-preference-form"
        onSubmit={handleSubmit}
        labels={labels}
        options={{
          defaultValues: dataToFormValues(initialData),
        }}
      >
        <div>
          <div
            data-h2-flex-item="base(1of1)"
            data-h2-padding="base(x1, 0, 0, 0)"
          >
            <div data-h2-padding="base(0, x2, 0, 0)" data-testid="workLocation">
              <Checklist
                idPrefix="work-location"
                legend={labels.locationPreferences}
                name="locationPreferences"
                items={enumToOptions(WorkRegion).map(({ value }) => ({
                  value,
                  label: intl.formatMessage(getWorkRegionsDetailed(value)),
                }))}
                rules={{
                  required: intl.formatMessage(errorMessages.required),
                }}
              />
            </div>
          </div>
          <div
            data-h2-flex-item="base(1of1)"
            data-h2-padding="base(x1, 0, 0, 0)"
          >
            <div data-h2-padding="base(0, x2, 0, 0)">
              <p>
                {intl.formatMessage({
                  defaultMessage:
                    "Indicate if there is a city that you would like to exclude from a region.",
                  id: "1CuGS6",
                  description:
                    "Explanation text for Location exemptions field in work location preference form",
                })}
              </p>
              <p data-h2-color="base(dark.dt-gray)">
                {intl.formatMessage({
                  defaultMessage:
                    "E.g.: You want to be considered for the Quebec region, but not for Montréal.",
                  id: "2K7dVp",
                  description:
                    "Example for Location exemptions field in work location preference form",
                })}
              </p>
            </div>
          </div>
          <div
            data-h2-flex-item="base(1of2)"
            data-h2-padding="base(x1, 0, 0, 0)"
          >
            <div data-h2-padding="base(0, x2, 0, 0)">
              <TextArea
                id="location-exemptions"
                label={labels.locationExemptions}
                name="locationExemptions"
                placeholder={intl.formatMessage({
                  defaultMessage: "Optionally, add a city or village here...",
                  id: "OH5tTS",
                  description:
                    "Location Exemptions field placeholder for work location preference form",
                })}
              />
            </div>
          </div>
        </div>
        <ProfileFormFooter
          mode="saveButton"
          cancelLink={{ href: returnRoute }}
        />
      </BasicForm>
    </ProfileFormWrapper>
  );
};

export default WorkLocationPreferenceForm;
