import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

import { Button, type ButtonProps } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props extends ButtonProps {
  content?: string;
}

export const ButtonWithTooltip = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { content, children, ...rest } = props;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" ref={ref} {...rest}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-gray-600" arrowClassName="bg-gray-600 fill-gray-600">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
});

ButtonWithTooltip.displayName = "ButtonWithTooltip";
