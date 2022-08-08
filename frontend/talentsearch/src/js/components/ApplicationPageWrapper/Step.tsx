import React from "react";
import Link from "@common/components/Link";

export interface StepProps {
  path: string;
  label: React.ReactNode;
  disabled?: boolean;
}

const Step = ({ path, label, disabled }: StepProps) => (
  <Link
    href={path}
    mode={disabled ? "solid" : "outline"}
    type="button"
    color="black"
    disabled={disabled}
  >
    {label}
  </Link>
);

export default Step;