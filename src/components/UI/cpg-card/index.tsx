"use client";
import ShareIcon from "@/public/icons/ShareIcon";
import TrashIcon from "@/public/icons/TrashIcon";
import LinkIcon from "@/public/svgs/blackLink.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { CpgCardPropsType } from "./type";

const CpgCard = ({
  id,
  orderId,
  price,
  currency,
  url,
  status,
  onDelete,
  shareHandler,
}: CpgCardPropsType) => {
  const t = useTranslations();
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id, id);
    }
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "active":
        return { text: t("wallet.active"), color: "text-blue-500" };
      case "inactive":
        return { text: t("wallet.inactive"), color: "text-gray-500" };
      case "completed":
        return { text: t("wallet.completed"), color: "text-emerald-500" };
      case "expired":
        return { text: t("wallet.expired"), color: "text-red-500" };
      case "wait":
        return { text: t("wallet.waiting"), color: "text-amber-500" };
      case "success":
        return { text: t("wallet.success"), color: "text-emerald-500" };
      default:
        return { text: status, color: "text-gray-500" };
    }
  };

  const statusDisplay = getStatusDisplay();
  return (
    <>
      <div className="bg-white p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src={LinkIcon} alt="link icon" width={16} height={16} />
            <p className="text-xs">{id}</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              onClick={() => shareHandler && shareHandler()}
              className="cursor-pointer hover:opacity-70 transition-opacity text-blue-500 dark:text-blue-400"
            >
              <ShareIcon />
            </div>
            {onDelete && (
              <div
                onClick={handleDelete}
                className="cursor-pointer hover:opacity-70 transition-opacity text-red-500 dark:text-red-400"
              >
                <TrashIcon />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="mt-4 flex-col flex gap-4">
            {orderId && (
              <div className="flex justify-between border-b border-gray-300 ">
                <p className="text-xs">{t("wallet.orderId")} :</p>{" "}
                <p className="text-gray-400 text-xs">{orderId}</p>
              </div>
            )}
            <div className="flex justify-between border-b border-gray-300 ">
              <p className="text-xs">{t("wallet.price")} :</p>{" "}
              <p className="text-gray-400 text-xs">{price}</p>
            </div>
            <div className="flex justify-between border-b border-gray-300 ">
              <p className="text-xs">{t("wallet.currency")} :</p>{" "}
              <p className="text-gray-400 text-xs">{currency}</p>
            </div>
            <div className="flex justify-between border-b border-gray-300 ">
              <p className="text-xs w-fit shrink-0">{t("wallet.url")} :</p>{" "}
              <p className="text-gray-400 text-xs text-right w-fit">
                <Link
                  href={`/payment/${url.split("payment")[1]}`}
                  className="text-blue-500"
                >
                  {url}
                </Link>
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-300 ">
              <p className="text-xs">{t("wallet.status")} :</p>{" "}
              <p className={`${statusDisplay.color} text-xs`}>
                {statusDisplay.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CpgCard;
