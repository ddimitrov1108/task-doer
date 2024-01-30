import alert, { AlertVariants } from "../cva/alert";
import { AlertOctagon, AlertTriangle, CheckCircle, Info } from "lucide-react";
import cn from "@/lib/cn";

interface Props extends React.ComponentProps<"div"> {
  variant: AlertVariants;
  message: string;
}

const getAlertVariantIcon = (variant: AlertVariants) => {
  switch (variant) {
    case "success":
      return <CheckCircle size={20} />;
    case "error":
      return <AlertOctagon size={20} />;
    case "warning":
      return <AlertTriangle size={20} />;
    case "info":
    default:
      return <Info size={20} />;
  }
};

const Alert = ({ variant = "info", message, className }: Props) => {
  const IconComponent = getAlertVariantIcon(variant);

  return (
    <div
      className={cn(
        "text-sm flex gap-2 items-center mb-4 px-4 py-2.5 border border-l-4 rounded-lg font-medium w-full",
        alert({ intent: variant }),
        className
      )}
    >
      {IconComponent}
      {message}
    </div>
  );
};
export default Alert;
