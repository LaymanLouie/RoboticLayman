import { memo } from "react";
import GradientText from "@/components/primitives/GradientText";

interface PageTitleProps {
  rest: string;
  prefix?: string;
}

const PageTitle = memo(function PageTitle({ rest, prefix = "The" }: PageTitleProps) {
  return (
    <>
      <GradientText gradient="louie">{prefix}</GradientText>{" "}
      <GradientText gradient="layman">{rest}</GradientText>
    </>
  );
});

export default PageTitle;
