import { cn } from "@/lib/utils";
import { TilteAndDescriptionProps } from "./type";

const TilteAndDescription = ({
  title,
  description,
  className,
}: TilteAndDescriptionProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-4", className)}>
      <p className="text-3xl max-w-80 font-semibold text-foreground">{title}</p>
      <p className="text-gray-500 text-sm font-medium">{description}</p>
    </div>
  );
};

export default TilteAndDescription;
