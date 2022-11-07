import React, { MouseEventHandler } from "react";
import Link from "../Link";

export interface SideMenuItemProps {
  as?: typeof Link | "button";
  icon: React.FC<{ className?: string }>;
  isActive?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement> &
    MouseEventHandler<HTMLButtonElement>;
}

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  as = Link,
  icon,
  children,
  isActive,
  onClick,
  href,
}) => {
  const El = as;
  const Icon = icon || null;

  return (
    <El
      data-h2-background-color="base(light.dt-secondary) base:focus-visible(lighter.dt-secondary.30) base:hover(lighter.dt-secondary.30)"
      data-h2-outline="base(none)"
      data-h2-padding="base(x.5, x1)"
      data-h2-cursor="base(pointer)"
      data-h2-border="base(bottom, 1px, solid, dt-white.10)"
      data-h2-color="base(dt-white)"
      data-h2-width="base(100%)"
      data-h2-text-align="base(left)"
      data-h2-display="base(block)"
      className={`side-menu__item${isActive ? ` side-menu__item--active` : ``}`}
      onClick={(e) => {
        if (onClick) {
          onClick(e as React.MouseEvent<HTMLButtonElement>);
        }
      }}
      {...(as === Link ? { href } : { type: "button" })}
    >
      <div data-h2-flex-grid="base(center, x.375, 0)">
        <div data-h2-flex-item="base(content)">
          {Icon ? (
            <Icon
              data-h2-width="base(x1)"
              data-h2-display="base(inline-block)"
              data-h2-margin="base(0, x.125, 0, 0)"
              data-h2-vertical-align="base(bottom)"
            />
          ) : null}
        </div>
        <div
          className="side-menu__item__label"
          data-h2-flex-item="base(content)"
        >
          <span
            data-h2-display="base(inline-block)"
            data-h2-min-width="base(12rem)"
          >
            {children}
          </span>
        </div>
      </div>
    </El>
  );
};

export default SideMenuItem;
