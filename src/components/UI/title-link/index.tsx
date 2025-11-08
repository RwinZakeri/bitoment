import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { titleLinkPropsType } from "./type";

const TitleLink = ({
  type,
  title,
  label,
  address,
  children,
  className,
  margin,
}: titleLinkPropsType) => {
  return (
    <div style={{ marginTop: margin }}>
      <div className="flex justify-between mb-3">
        <p
          className={`text-foreground text-sm ${
            type === "date" ? "" : "font-semibold"
          }`}
        >
          {title}
        </p>

        {type === "date" ? (
          <p className="text-sm text-gray-500">{label}</p>
        ) : type === "link" ? (
          <Link className="text-xs text-blue-500" href={address as Url}>
            {label}
          </Link>
        ) : null}
      </div>

      <div className={className}>{children}</div>
    </div>
  );
};

export default TitleLink;
