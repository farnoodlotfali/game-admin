import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

import { Button, type ButtonProps } from "./ui/button";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>((props, ref) => {
  const { loading, children, ...rest } = props;

  return (
    <Button ref={ref} disabled={loading} {...rest}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  );
});

LoadingButton.displayName = "LoadingButton";
