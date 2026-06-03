import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps
  extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  loadingText?: string;
}

const LoadingButton = ({
  loading = false,
  loadingText = "Loading...",
  children,
  disabled,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;