// Vendor dependencies
import React from "react";

// Local helper dependencies

// Local component dependencies
import Heading from "./heading";

// Define the interface
export interface FeatureBlockProps {
  content: {
    title: string;
    summary: string;
    img: {
      path: string;
      alt: string;
    };
    link: {
      path: string;
      title: string;
      label: string;
    };
  };
}

// Create the page component
const FeatureBlock: React.FC<FeatureBlockProps> = ({
  content,
}): React.ReactElement => {
  return (
    <div
      data-h2-display="base(flex)"
      data-h2-flex-direction="base(column)"
      data-h2-background-color="base(white) base:dark(black.lighter)"
      data-h2-radius="base(rounded)"
      data-h2-overflow="base(hidden)"
      data-h2-shadow="base(large)"
    >
      <div
        data-h2-color="base(white)"
        data-h2-background-color="base(black.darker)"
        data-h2-padding="base(x1)"
      >
        <Heading type="h3" size="h6" label={content.title} id="" />
      </div>
      <div
        data-h2-height="base(x10) desktop(x12)"
        style={{
          backgroundImage: `url('${content.img.path}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <p data-h2-flex-grow="base(1)" data-h2-padding="base(x1)">
        {content.summary}
      </p>
      <div data-h2-padding="base(0, x1, x1, x1)">
        <a
          href={content.link.path}
          title={content.link.title}
          data-h2-background-color="base:focus-visible(focus)"
          data-h2-outline="base(none)"
          data-h2-color="base:hover(tm-blue.dark) base:focus-visible(black)"
        >
          {content.link.label}
        </a>
      </div>
    </div>
  );
};

// Export the component
export default FeatureBlock;
