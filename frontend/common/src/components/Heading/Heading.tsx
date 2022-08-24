import React from "react";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
}

const styleMap: Record<HeadingLevel, Record<string, string>> = {
  h1: {
    "data-h2-font-weight": "base(300)",
    "data-h2-font-size": "base(h1)",
  },
  h2: {
    "data-h2-font-weight": "base(700)",
    "data-h2-font-size": "base(h2)",
  },
  h3: {
    "data-h2-font-weight": "base(400)",
    "data-h2-font-size": "base(h3)",
  },
  h4: {
    "data-h2-font-weight": "base(300)",
    "data-h2-font-size": "base(h4)",
  },
  h5: {
    "data-h2-font-weight": "base(700)",
    "data-h2-font-size": "base(h5)",
  },
  h6: {
    "data-h2-font-weight": "base(700)",
    "data-h2-font-size": "base(h6)",
  },
};

const Heading: React.FC<HeadingProps> = ({
  level = "h2",
  children,
  ...rest
}) => {
  const El = level;

  return (
    <El {...styleMap[level]} {...rest}>
      {children}
    </El>
  );
};

export default Heading;
