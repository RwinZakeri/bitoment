"use client";
import ShareIcon from "@/public/icons/ShareIcon";
import TrashIcon from "@/public/icons/TrashIcon";
import LinkIcon from "@/public/svgs/blackLink.svg";
import Image from "next/image";
import Link from "next/link";
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
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id, id);
    }
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "active":
        return { text: "Active", color: "text-blue-500" };
      case "inactive":
        return { text: "Inactive", color: "text-gray-500" };
      case "completed":
        return { text: "Completed", color: "text-emerald-500" };
      case "expired":
        return { text: "Expired", color: "text-red-500" };
      case "wait":
        return { text: "Waiting", color: "text-amber-500" };
      case "success":
        return { text: "Success", color: "text-emerald-500" };
      default:
        return { text: status, color: "text-gray-500" };
    }
  };

  const statusDisplay = getStatusDisplay();
  return (
    <>
      <div className="bg-white dark:bg-gray-200 p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src={LinkIcon} alt="link icon" width={16} height={16} />
            <p className="text-xs">{id}</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              onClick={() => shareHandler && shareHandler()}
              className="cursor-pointer hover:opacity-70 transition-opacity"
            >
              <ShareIcon />
            </div>
            {onDelete && (
              <div
                onClick={handleDelete}
                className="cursor-pointer hover:opacity-70 transition-opacity"
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
                <p className="text-xs">Order ID :</p>{" "}
                <p className="text-gray-400 text-xs">{orderId}</p>
              </div>
            )}
            <div className="flex justify-between border-b border-gray-300 ">
              <p className="text-xs">Price :</p>{" "}
              <p className="text-gray-400 text-xs">{price}</p>
            </div>
            <div className="flex justify-between border-b border-gray-300 ">
              <p className="text-xs">Currency :</p>{" "}
              <p className="text-gray-400 text-xs">{currency}</p>
            </div>
            <div className="flex justify-between border-b border-gray-300 ">
              <p className="text-xs w-fit shrink-0">Url :</p>{" "}
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
              <p className="text-xs">Status :</p>{" "}
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
