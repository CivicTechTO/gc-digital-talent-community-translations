import React from "react";
import { useIntl } from "react-intl";

import Breadcrumbs from "@common/components/Breadcrumbs";
import type { BreadcrumbsProps } from "@common/components/Breadcrumbs";
import NotFound from "@common/components/NotFound";
import Pending from "@common/components/Pending";
import Card from "@common/components/Card";
import { Button, Link } from "@common/components";
import { getLocale } from "@common/helpers/localize";
import { imageUrl } from "@common/helpers/router";

import {
  AdvertisementStatus,
  PoolCandidate,
  Scalars,
  SkillCategory,
} from "@common/api/generated";
import TableOfContents from "@common/components/TableOfContents";
import {
  BoltIcon,
  BriefcaseIcon as BriefcaseIconOutline,
  PhoneIcon,
  LightBulbIcon,
  CheckCircleIcon,
  CpuChipIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";
import Accordion from "@common/components/accordion";
import {
  getLanguageRequirement,
  getSecurityClearance,
} from "@common/constants/localizedConstants";
import { categorizeSkill } from "@common/helpers/skillUtils";
import commonMessages from "@common/messages/commonMessages";

import { notEmpty } from "@common/helpers/util";
import { useGetPoolAdvertisementQuery, Maybe } from "../../api/generated";
import type { PoolAdvertisement } from "../../api/generated";
import { useDirectIntakeRoutes } from "../../directIntakeRoutes";
import TALENTSEARCH_APP_DIR, {
  TALENTSEARCH_RECRUITMENT_EMAIL,
} from "../../talentSearchConstants";
import PoolInfoCard from "./PoolInfoCard";
import ClassificationDefinition from "../ClassificationDefinition/ClassificationDefinition";
import getFullPoolAdvertisementTitle from "./getFullPoolAdvertisementTitle";
import { hasUserApplied, isAdvertisementVisible } from "./utils";

interface ApplyButtonProps {
  poolId: Scalars["ID"];
}

const ApplyButton = ({ poolId }: ApplyButtonProps) => {
  const intl = useIntl();
  const paths = useDirectIntakeRoutes();

  return (
    <Link
      type="button"
      mode="solid"
      color="primary"
      href={paths.createApplication(poolId)}
    >
      {intl.formatMessage({
        defaultMessage: "Apply for this process",
        id: "W2YIEA",
        description: "Link text to apply for a pool advertisement",
      })}
    </Link>
  );
};

const AlreadyAppliedButton = () => {
  const intl = useIntl();
  return (
    <Button type="button" color="primary" mode="solid" disabled>
      {intl.formatMessage({
        defaultMessage: "You have already applied to this.",
        id: "mwEGU+",
        description:
          "Disabled button when a user already applied to a pool opportunity",
      })}
    </Button>
  );
};

const Text = ({ children }: { children: React.ReactNode }) => (
  <p data-h2-margin="base(x0.5, 0, x.5, 0)">{children}</p>
);
interface IconTitleProps {
  children: React.ReactNode;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const IconTitle = ({ children, icon }: IconTitleProps) => {
  const Icon = icon;

  return (
    <h3
      data-h2-display="base(flex)"
      data-h2-align-items="base(center)"
      data-h2-font-size="base(h4, 1)"
      data-h2-margin="base(x1.5, 0, x.25, 0)"
    >
      <Icon style={{ width: "1em", marginRight: "0.5rem" }} />
      <span>{children}</span>
    </h3>
  );
};

const anchorTag = (chunks: React.ReactNode): React.ReactNode => (
  <a href={`mailto:${TALENTSEARCH_RECRUITMENT_EMAIL}`}>{chunks}</a>
);

interface PoolAdvertisementProps {
  poolAdvertisement: PoolAdvertisement;
  hasApplied?: boolean;
}

const PoolAdvertisement = ({
  poolAdvertisement,
  hasApplied,
}: PoolAdvertisementProps) => {
  const intl = useIntl();
  const locale = getLocale(intl);
  const paths = useDirectIntakeRoutes();

  const classification = poolAdvertisement.classifications
    ? poolAdvertisement.classifications[0]
    : null;
  const genericTitle = classification?.genericJobTitles?.length
    ? classification.genericJobTitles[0]
    : null;
  const classificationSuffix = `${classification?.group}-0${classification?.level}`;
  const fullTitle = getFullPoolAdvertisementTitle(intl, poolAdvertisement);
  const canApply =
    poolAdvertisement.advertisementStatus &&
    poolAdvertisement.advertisementStatus === AdvertisementStatus.Published;

  const languageRequirement = intl.formatMessage(
    getLanguageRequirement(poolAdvertisement.advertisementLanguage ?? ""),
  );

  const securityClearance = intl.formatMessage(
    getSecurityClearance(poolAdvertisement.securityClearance ?? ""),
  );

  const essentialSkills = categorizeSkill(poolAdvertisement.essentialSkills);
  const nonEssentialSkills = categorizeSkill(
    poolAdvertisement.nonessentialSkills,
  );

  const applyBtn = hasApplied ? (
    <AlreadyAppliedButton />
  ) : (
    <ApplyButton poolId={poolAdvertisement.id} />
  );

  const links = [
    {
      title: intl.formatMessage({
        defaultMessage: "Browse opportunities",
        id: "NSuNSA",
        description: "Breadcrumb title for the browse pools page.",
      }),
      href: paths.allPools(),
    },
    {
      title: fullTitle,
    },
  ] as BreadcrumbsProps["links"];

  const sections: Record<string, { id: string; title: string }> = {
    about: {
      id: "about-section",
      title: intl.formatMessage({
        defaultMessage: "About this process",
        id: "18dDgn",
        description: "Title for the about section of a pool advertisement",
      }),
    },
    requiredSkills: {
      id: "required-skills-section",
      title: intl.formatMessage({
        defaultMessage: "Need to have",
        id: "WkX8Ge",
        description:
          "Title for the required skills section of a pool advertisement",
      }),
    },
    optionalSkills: {
      id: "optional-skills-section",
      title: intl.formatMessage({
        defaultMessage: "Nice to have",
        id: "STLaIq",
        description:
          "Title for the optional skills section of a pool advertisement",
      }),
    },
    requirements: {
      id: "requirements-section",
      title: intl.formatMessage({
        defaultMessage: "Requirements",
        id: "iP8EMf",
        description:
          "Title for the requirements section of a pool advertisement",
      }),
    },
    details: {
      id: "details-section",
      title: intl.formatMessage({
        defaultMessage: "Additional details",
        id: "mNWpoy",
        description: "Title for the details section of a pool advertisement",
      }),
    },
    apply: {
      id: "apply-section",
      title: intl.formatMessage({
        defaultMessage: "Apply now",
        id: "C6YPk3",
        description:
          "Title for the apply button section of a pool advertisement",
      }),
    },
  };

  return (
    <>
      <div
        data-h2-padding="base(x1, x.5)"
        data-h2-color="base(dt-white)"
        style={{
          background: `url(${imageUrl(
            TALENTSEARCH_APP_DIR,
            "applicant-profile-banner.png",
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div data-h2-container="base(center, medium, 0)">
          <h1 data-h2-margin="base(x2, 0)">{fullTitle}</h1>
        </div>
      </div>
      <div
        data-h2-background-color="base(dt-white)"
        data-h2-shadow="base(m)"
        data-h2-padding="base(x1, 0)"
      >
        <div data-h2-container="base(center, medium, 0)">
          <Breadcrumbs links={links} />
          <div
            data-h2-display="base(flex)"
            data-h2-flex-direction="base(column) p-tablet(row)"
            data-h2-justify-content="base(space-between)"
            data-h2-align-items="base(center) p-tablet(flex-end)"
            data-h2-margin="base(x1, 0, 0, 0)"
          >
            <div>
              <PoolInfoCard
                closingDate={poolAdvertisement.expiryDate}
                classification={classificationSuffix}
                salary={{
                  min: classification?.minSalary,
                  max: classification?.maxSalary,
                }}
              />
            </div>
            <div>{applyBtn}</div>
          </div>
        </div>
      </div>
      <TableOfContents.Wrapper>
        <TableOfContents.Navigation data-h2-padding="base(0, x2, 0, x2) l-tablet(0, 0, 0, 0)">
          <TableOfContents.AnchorLink id={sections.about.id}>
            {sections.about.title}
          </TableOfContents.AnchorLink>
          <TableOfContents.AnchorLink id={sections.requiredSkills.id}>
            {sections.requiredSkills.title}
          </TableOfContents.AnchorLink>
          <TableOfContents.AnchorLink id={sections.optionalSkills.id}>
            {sections.optionalSkills.title}
          </TableOfContents.AnchorLink>
          <TableOfContents.AnchorLink id={sections.requirements.id}>
            {sections.requirements.title}
          </TableOfContents.AnchorLink>
          <TableOfContents.AnchorLink id={sections.details.id}>
            {sections.details.title}
          </TableOfContents.AnchorLink>
          <TableOfContents.AnchorLink id={sections.apply.id}>
            {sections.apply.title}
          </TableOfContents.AnchorLink>
        </TableOfContents.Navigation>
        <TableOfContents.Content data-h2-padding="base(0, x2, 0, x2) l-tablet(0, x2, 0, 0)">
          <TableOfContents.Section id={sections.about.id}>
            <TableOfContents.Heading>
              {sections.about.title}
            </TableOfContents.Heading>
            <Accordion
              title={intl.formatMessage({
                defaultMessage: "What are pool recruitments?",
                id: "asP33b",
                description:
                  "Title for according describing pool recruitment's",
              })}
            >
              <Text>
                {intl.formatMessage({
                  defaultMessage:
                    "When you apply to this process, you are not applying for a specific position. This process is intended to create and maintain an inventory to staff various positions at the same level in different departments and agencies across the Government of Canada.",
                  id: "kH4Jsf",
                  description: "Description of pool recruitment, paragraph one",
                })}
              </Text>
              <Text>
                {intl.formatMessage({
                  defaultMessage:
                    "When hiring managers have IT staffing needs and positions become available, applicants who meet the qualifications for this process may be contacted for further assessment. This means various managers may reach out to you about specific opportunities in the area of application development.",
                  id: "m5hjaz",
                  description: "Description of pool recruitment, paragraph two",
                })}
              </Text>
            </Accordion>
            {genericTitle?.key && (
              <Accordion
                title={intl.formatMessage(
                  {
                    defaultMessage:
                      "What does {classification}{genericTitle} mean?",
                    id: "gpuTAV",
                    description:
                      "Title for description of a pool advertisements classification group/level",
                  },
                  {
                    classification: classificationSuffix,
                    genericTitle: genericTitle?.name
                      ? ` ${genericTitle.name[locale]}`
                      : ``,
                  },
                )}
              >
                <ClassificationDefinition name={genericTitle.key} />
              </Accordion>
            )}
            {poolAdvertisement.yourImpact ? (
              <>
                <IconTitle icon={BoltIcon}>
                  {intl.formatMessage({
                    defaultMessage: "Your impact",
                    id: "Kl5OX1",
                    description:
                      "Title for a pool advertisements impact section.",
                  })}
                </IconTitle>
                <p>{poolAdvertisement.yourImpact[locale]}</p>
              </>
            ) : null}
            {poolAdvertisement.keyTasks ? (
              <>
                <IconTitle icon={BriefcaseIconOutline}>
                  {intl.formatMessage({
                    defaultMessage: "Your work",
                    id: "uv2lY0",
                    description:
                      "Title for a pool advertisements key tasks section.",
                  })}
                </IconTitle>
                <p>{poolAdvertisement.keyTasks[locale]}</p>
              </>
            ) : null}
          </TableOfContents.Section>
          <TableOfContents.Section id={sections.requiredSkills.id}>
            <TableOfContents.Heading>
              {sections.requiredSkills.title}
            </TableOfContents.Heading>
            {essentialSkills[SkillCategory.Technical]?.length ? (
              <>
                <IconTitle icon={CpuChipIcon}>
                  {intl.formatMessage({
                    defaultMessage: "Occupational skills",
                    id: "zeC2K0",
                    description:
                      "Title for occupational skills on a pool advertisement",
                  })}
                </IconTitle>
                <Text>
                  {intl.formatMessage({
                    defaultMessage:
                      "To be admitted into this process, you will need to submit sufficient information to verify your experience in <strong>all of these skills (Need to have - Occupational)</strong> with your application.",
                    id: "mbtf3h",
                    description:
                      "Explanation of a pools required occupational skills",
                  })}
                </Text>
                {essentialSkills[SkillCategory.Technical]?.map((skill) => (
                  <Accordion title={skill.name[locale] || ""} key={skill.id}>
                    <Text>
                      {skill.description ? skill.description[locale] : ""}
                    </Text>
                  </Accordion>
                ))}
              </>
            ) : null}
            {essentialSkills[SkillCategory.Behavioural]?.length ? (
              <>
                <IconTitle icon={CloudIcon}>
                  {intl.formatMessage({
                    defaultMessage: "Transferrable skills",
                    id: "0I8W8B",
                    description:
                      "Title for transferrable skills on a pool advertisement",
                  })}
                </IconTitle>
                <Text>
                  {intl.formatMessage({
                    defaultMessage:
                      "To be admitted into this process, you will need to display capability in these skills during the assessment process.",
                    id: "0FjYi+",
                    description:
                      "Explanation of a pools required transferrable skills",
                  })}
                </Text>
                {essentialSkills[SkillCategory.Behavioural]?.map((skill) => (
                  <Accordion title={skill.name[locale] || ""} key={skill.id}>
                    <Text>
                      {skill.description ? skill.description[locale] : ""}
                    </Text>
                  </Accordion>
                ))}
              </>
            ) : null}
          </TableOfContents.Section>
          <TableOfContents.Section id={sections.optionalSkills.id}>
            <TableOfContents.Heading>
              {sections.optionalSkills.title}
            </TableOfContents.Heading>
            {nonEssentialSkills[SkillCategory.Technical]?.length ? (
              <>
                <IconTitle icon={CpuChipIcon}>
                  {intl.formatMessage({
                    defaultMessage: "Occupational skills",
                    id: "zeC2K0",
                    description:
                      "Title for occupational skills on a pool advertisement",
                  })}
                </IconTitle>
                <Text>
                  {intl.formatMessage({
                    defaultMessage:
                      "To strengthen your application, take into consideration these skills that many hiring managers are looking for.",
                    id: "yu4yB8",
                    description:
                      "Explanation of a pools optional transferrable skills",
                  })}
                </Text>
                {nonEssentialSkills[SkillCategory.Technical]?.map((skill) => (
                  <Accordion title={skill.name[locale] || ""} key={skill.id}>
                    <Text>
                      {skill.description ? skill.description[locale] : ""}
                    </Text>
                  </Accordion>
                ))}
              </>
            ) : null}
            {nonEssentialSkills[SkillCategory.Behavioural]?.length ? (
              <>
                <IconTitle icon={CloudIcon}>
                  {intl.formatMessage({
                    defaultMessage: "Transferrable skills",
                    id: "0I8W8B",
                    description:
                      "Title for transferrable skills on a pool advertisement",
                  })}
                </IconTitle>
                {nonEssentialSkills[SkillCategory.Behavioural]?.map((skill) => (
                  <Accordion title={skill.name[locale] || ""} key={skill.id}>
                    <Text>
                      {skill.description ? skill.description[locale] : ""}
                    </Text>
                  </Accordion>
                ))}
              </>
            ) : null}
          </TableOfContents.Section>
          <TableOfContents.Section id={sections.requirements.id}>
            <TableOfContents.Heading>
              {sections.requirements.title}
            </TableOfContents.Heading>
            <IconTitle icon={LightBulbIcon}>
              {intl.formatMessage({
                defaultMessage: "Experience and education",
                id: "owzveI",
                description:
                  "Title for experience and education pool requirements",
              })}
            </IconTitle>
            <div
              data-h2-display="base(flex)"
              data-h2-flex-direction="base(column) p-tablet(row)"
              data-h2-align-items="base(center) p-tablet(stretch)"
            >
              <Card
                color="ts-secondary"
                style={{ width: "100%" }}
                title={intl.formatMessage({
                  defaultMessage: "Combination Experience",
                  id: "7o+Vzu",
                  description:
                    "Title for pool applicant experience requirements",
                })}
              >
                <Text>
                  {intl.formatMessage({
                    defaultMessage:
                      "2 or more years of combined experience in a related field including any of the following:",
                    id: "s60QyR",
                    description:
                      "lead in to list of experience required for a pool applicant",
                  })}
                </Text>
                <ul>
                  <li>
                    {intl.formatMessage({
                      defaultMessage: "On-the-job learning",
                      id: "qNL/Rp",
                      description:
                        "pool experience requirement, on job learning",
                    })}
                  </li>
                  <li>
                    {intl.formatMessage({
                      defaultMessage: "Non-conventional training",
                      id: "YlWJ/N",
                      description:
                        "pool experience requirement, non-conventional training",
                    })}
                  </li>
                  <li>
                    {intl.formatMessage({
                      defaultMessage: "Formal education",
                      id: "DydUje",
                      description:
                        "pool experience requirement, formal education",
                    })}
                  </li>
                  <li>
                    {intl.formatMessage({
                      defaultMessage: "Other field related experience",
                      id: "GNvz2K",
                      description: "pool experience requirement, other",
                    })}
                  </li>
                </ul>
              </Card>
              <div
                data-h2-font-size="base(h4, 1)"
                data-h2-padding="base(x.5)"
                data-h2-font-weight="base(700)"
                data-h2-align-self="base(center)"
                data-h2-text-transform="base(uppercase)"
              >
                {intl.formatMessage({
                  defaultMessage: "or",
                  id: "l9AK3C",
                  description:
                    "that appears between different experience requirements for a pool applicant",
                })}
              </div>
              <Card
                style={{ width: "100%" }}
                color="ts-secondary"
                title={intl.formatMessage({
                  defaultMessage: "2-Year Post-secondary Experience",
                  id: "/Gu4zR",
                  description:
                    "Title for pool applicant education requirements",
                })}
              >
                <Text>
                  {intl.formatMessage({
                    defaultMessage:
                      "Successful completion of two years of post secondary education in computer science, information technology, information management or another specialty relevant to this position.",
                    id: "r9FSaq",
                    description:
                      "post secondary education experience for pool advertisement",
                  })}
                </Text>
              </Card>
            </div>
            <IconTitle icon={CheckCircleIcon}>
              {intl.formatMessage({
                defaultMessage: "Other requirements",
                id: "cHJFcW",
                description: "Title for other pool requirements",
              })}
            </IconTitle>
            <ul>
              <li>
                {intl.formatMessage(
                  {
                    defaultMessage:
                      "Language requirement: {languageRequirement}",
                    id: "fvJnoC",
                    description: "Pool advertisement language requirement",
                  },
                  {
                    languageRequirement,
                  },
                )}
              </li>
              <li>
                {intl.formatMessage(
                  {
                    defaultMessage: "Security clearance: {securityClearance}",
                    id: "GYk6Nz",
                    description:
                      "Pool advertisement security clearance requirement",
                  },
                  {
                    securityClearance,
                  },
                )}
              </li>
              {poolAdvertisement.isRemote ? (
                <li>
                  {intl.formatMessage({
                    defaultMessage: "Location: Remote",
                    id: "+5cxyT",
                    description:
                      "Pool advertisement location requirement, Remote option",
                  })}
                </li>
              ) : (
                poolAdvertisement.advertisementLocation && (
                  <li>
                    {intl.formatMessage(
                      {
                        defaultMessage: "Location: {location}",
                        id: "HYm817",
                        description:
                          "Pool advertisement location requirement, English",
                      },
                      {
                        location:
                          poolAdvertisement.advertisementLocation[locale],
                      },
                    )}
                  </li>
                )
              )}
            </ul>
          </TableOfContents.Section>
          <TableOfContents.Section id={sections.details.id}>
            <TableOfContents.Heading>
              {sections.details.title}
            </TableOfContents.Heading>
            <IconTitle icon={PhoneIcon}>
              {intl.formatMessage({
                defaultMessage: "Contact and Accommodations",
                id: "W6dFND",
                description:
                  "Title for contact information on pool advertisement",
              })}
            </IconTitle>
            <Text>
              {intl.formatMessage({
                defaultMessage:
                  "Do you require accommodations, or do you have any questions about this process?",
                id: "2K8q04",
                description:
                  "Opening sentence asking if accommodations are needed",
              })}
            </Text>
            <Text>
              {intl.formatMessage({
                defaultMessage:
                  "Please contact the Digital Community Management Office if you require any accommodations during this application process.",
                id: "JnhEcG",
                description:
                  "Description of what to do when accommodations are needed",
              })}
            </Text>
            <Text>
              {intl.formatMessage(
                {
                  defaultMessage:
                    "<strong>Email</strong>: <anchorTag>{emailAddress}</anchorTag>",
                  id: "Wnw+oz",
                  description: "An email address to contact for help",
                },
                {
                  anchorTag,
                  emailAddress: TALENTSEARCH_RECRUITMENT_EMAIL,
                },
              )}
            </Text>
            <IconTitle icon={PhoneIcon}>
              {intl.formatMessage({
                defaultMessage: "Hiring Policies",
                id: "isfAkZ",
                description:
                  "Title for hiring information on pool advertisement",
              })}
            </IconTitle>
            <Text>
              {intl.formatMessage({
                defaultMessage:
                  "Preference will be given to veterans, Canadian citizens and to permanent residents.",
                id: "IF1xj8",
                description: "First hiring policy for pool advertisement",
              })}
            </Text>
          </TableOfContents.Section>
          <TableOfContents.Section id={sections.apply.id}>
            <TableOfContents.Heading>
              {sections.apply.title}
            </TableOfContents.Heading>
            <Text>
              {canApply
                ? intl.formatMessage({
                    defaultMessage:
                      "If this process looks like the right fit for you apply now!",
                    id: "SuqyvD",
                    description:
                      "Message displayed when the pool advertisement can be applied to.",
                  })
                : intl.formatMessage({
                    defaultMessage: "The deadline for submission has passed.",
                    id: "U+ApNl",
                    description:
                      "Message displayed when the pool advertisement has expired.",
                  })}
            </Text>
            {applyBtn}
          </TableOfContents.Section>
        </TableOfContents.Content>
      </TableOfContents.Wrapper>
    </>
  );
};

interface PoolAdvertisementPageProps {
  id: string;
}

const PoolAdvertisementPage = ({ id }: PoolAdvertisementPageProps) => {
  const intl = useIntl();

  const [{ data, fetching, error }] = useGetPoolAdvertisementQuery({
    variables: { id },
  });

  const isVisible = isAdvertisementVisible(
    data?.me?.roles?.filter(notEmpty) || [],
    data?.poolAdvertisement?.advertisementStatus ?? null,
  );

  // grab pool candidates of Me, then check whether a pool candidate exists that matches the advertisement AND is submitted
  const hasApplied = hasUserApplied(
    (data?.me?.poolCandidates as Maybe<PoolCandidate>[]) || [],
    data?.poolAdvertisement?.id,
  );

  return (
    <Pending fetching={fetching} error={error}>
      {data?.poolAdvertisement && isVisible ? (
        <PoolAdvertisement
          poolAdvertisement={data?.poolAdvertisement}
          hasApplied={hasApplied}
        />
      ) : (
        <NotFound
          headingMessage={intl.formatMessage(commonMessages.notFound, {
            type: "Pool",
            id,
          })}
        >
          {intl.formatMessage({
            defaultMessage: "Error, pool unable to be loaded",
            id: "DcEinN",
            description: "Error message, placeholder",
          })}
        </NotFound>
      )}
    </Pending>
  );
};

export default PoolAdvertisementPage;
