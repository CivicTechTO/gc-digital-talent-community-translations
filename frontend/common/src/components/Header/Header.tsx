import React from "react";
import { useIntl } from "react-intl";
import {
  getLocale,
  localizePath,
  oppositeLocale,
} from "../../helpers/localize";
import { imageUrl, Link, useLocation } from "../../helpers/router";

export interface HeaderProps {
  baseUrl: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({ baseUrl }) => {
  const intl = useIntl();
  const locale = getLocale(intl);

  const location = useLocation();
  const changeToLang = oppositeLocale(locale);
  const languageTogglePath = localizePath(location, changeToLang);
  return (
    <header
      data-h2-padding="b(x1, 0)"
      data-h2-border="b(bottom, 1px, solid, dt-gray)">
      <div data-h2-container="b(center, large, x2)">
        <div data-h2-flex-grid="b(flex-start, 0, x1) p-tablet(center, 0, x3)">
          <div
            data-h2-flex-item="b(1of1) p-tablet(1of2)"
            data-h2-text-align="b(center) p-tablet(left)"
          >
            <a
              href={`https://www.canada.ca/${locale}.html`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                style={{ width: "20rem" }}
                src={imageUrl(baseUrl, "logo_goc_colour.svg")}
                alt={intl.formatMessage({
                  defaultMessage: "Canada.ca",
                  description: "Alt text for the Canada logo link in the Header.",
                })}
              />
            </a>
          </div>
          <div
            data-h2-flex-item="b(1of1) p-tablet(1of2)"
            data-h2-text-align="b(center) p-tablet(right)"
          >
            <Link
              href={languageTogglePath}
              lang={changeToLang === "en" ? "en" : "fr"}
              title={intl.formatMessage({
                defaultMessage: "Change language",
                description: "Title for the language toggle link.",
              })}
            >
              {changeToLang === "en" ? "English" : "Français"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
