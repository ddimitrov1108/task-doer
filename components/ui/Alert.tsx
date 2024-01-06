import { ReactNode } from "react";
import { AlertIconsVariants, AlertVariants, alert } from "../cva/alert";
import { AlertOctagon, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  variant: AlertVariants;
  children: ReactNode;
  className?: string;
}

const getAlertVariantIcon = (variant: AlertIconsVariants): JSX.Element => {
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

const Alert = ({ variant = "info", children, className }: Props) => {
  const IconComponent: JSX.Element = getAlertVariantIcon(variant);

  return (
    <div
      className={cn(
        "flex gap-2 items-center mb-4 px-4 py-2.5 border border-l-4 rounded-lg font-medium w-full",
        alert({ intent: variant }),
        className
      )}
    >
      <div className="text-2xl">{IconComponent}</div>

      <p>{children}</p>
    </div>
  );
};
export default Alert;
