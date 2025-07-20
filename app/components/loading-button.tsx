import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LoadingButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export function LoadingButton({
  loading = false,
  disabled,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
