"use client";
import ShareIcon from "@/public/icons/ShareIcon";
import TrashIcon from "@/public/icons/TrashIcon";
import LinkIcon from "@/public/svgs/blackLink.svg";
import Image from "next/image";
import { useState } from "react";
import Modal from "../modal";
import { CpgCardPropsType } from "./type";

const CpgCard = ({
  id,
  orderId,
  price,
  currency,
  url,
  status,
  onDelete,
}: CpgCardPropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      <div className="bg-white p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src={LinkIcon} alt="link icon" width={16} height={16} />
            <p className="text-xs">{id}</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              onClick={handleShareClick}
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
              <div className="flex justify-between border-b-[1px] border-gray-300 ">
                <p className="text-xs">Order ID :</p>{" "}
                <p className="text-gray-400 text-xs">{orderId}</p>
              </div>
            )}
            <div className="flex justify-between border-b-[1px] border-gray-300 ">
              <p className="text-xs">Price :</p>{" "}
              <p className="text-gray-400 text-xs">{price}</p>
            </div>
            <div className="flex justify-between border-b-[1px] border-gray-300 ">
              <p className="text-xs">Currency :</p>{" "}
              <p className="text-gray-400 text-xs">{currency}</p>
            </div>
            <div className="flex justify-between border-b-[1px] border-gray-300 ">
              <p className="text-xs">Url :</p>{" "}
              <p className="text-gray-400 text-xs">{url}</p>
            </div>
            <div className="flex justify-between border-b-[1px] border-gray-300 ">
              <p className="text-xs">Status :</p>{" "}
              <p className={`${statusDisplay.color} text-xs`}>
                {statusDisplay.text}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Share Payment Link</h3>
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-600 break-all">{url}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(url)}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Copy Link
            </button>
            <button
              onClick={handleCloseModal}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CpgCard;
