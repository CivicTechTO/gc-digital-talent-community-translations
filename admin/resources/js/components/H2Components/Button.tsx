import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  color: "primary" | "secondary" | "cta" | "white";
  mode: "solid" | "outline" | "inline";
  onClick?: () => void;
}

const colorMap: Record<
  "primary" | "secondary" | "cta" | "white",
  Record<
    "solid" | "outline" | "inline",
    Record<"border" | "background" | "font", string>
  >
> = {
  primary: {
    solid: {
      border: "lightpurple",
      background: "lightpurple",
      font: "white",
    },
    outline: {
      border: "lightpurple",
      background: "[light]lightpurple[.1]",
      font: "lightpurple",
    },
    inline: {
      border: "[light]white[0]",
      background: "[light]white[0]",
      font: "lightpurple",
    },
  },
  secondary: {
    solid: {
      border: "lightnavy",
      background: "lightnavy",
      font: "white",
    },
    outline: {
      border: "lightnavy",
      background: "[light]lightnavy[.1]",
      font: "lightnavy",
    },
    inline: {
      border: "[light]white[0]",
      background: "[light]white[0]",
      font: "lightnavy",
    },
  },
  cta: {
    solid: {
      border: "darkgold",
      background: "darkgold",
      font: "black",
    },
    outline: {
      border: "darkgold",
      background: "[light]darkgold[.1]",
      font: "darkgold",
    },
    inline: {
      border: "[light]white[0]",
      background: "[light]white[0]",
      font: "darkgold",
    },
  },
  white: {
    solid: {
      border: "white",
      background: "white",
      font: "lightpurple",
    },
    outline: {
      border: "white",
      background: "[light]white[0]",
      font: "white",
    },
    inline: {
      border: "[light]white[0]",
      background: "[light]white[0]",
      font: "white",
    },
  },
};

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  mode,
  onClick,
}): React.ReactElement => {
  return (
    <button
      type="button"
      data-h2-border={`b(${colorMap[color][mode].border}, all, solid, s)`}
      data-h2-radius="b(s)"
      data-h2-padding="b(top-bottom, xs) b(right-left, s)"
      data-h2-bg-color={`b(${colorMap[color][mode].background})`}
      data-h2-font-color={`b(${colorMap[color][mode].font})`}
      data-h2-font-size="b(caption) m(normal)"
      data-h2-font-weight="b(400)"
      data-h2-font-style="b(underline)"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
