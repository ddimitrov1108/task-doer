import { ReactNode } from "react";
import { AlertIconsVariants, AlertVariants, alert } from "../cva/alert";
import { AlertOctagon, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  variant: AlertVariants;
  children: ReactNode;
}

const getAlertIcon = (variant: AlertIconsVariants) => {
  switch (variant) {
    case "success":
      return <CheckCircle />;
    case "error":
      return <AlertOctagon />;
    case "warning":
      return <AlertTriangle />;
    case "info":
    default:
      return <Info />;
  }
};

const Alert = ({ variant = "info", children, ...restProps }: Props) => {
  const IconComponent = getAlertIcon(variant);

  return (
    <div
      className={cn(
        "flex gap-2 mb-4 items-center px-4 py-2.5 border border-l-4 rounded-lg font-medium text-base w-full",
        alert({ intent: variant })
      )}
      {...restProps}
    >
      <div className="text-2xl">{IconComponent}</div>

      <p>{children}</p>
    </div>
  );
};
export default Alert;
