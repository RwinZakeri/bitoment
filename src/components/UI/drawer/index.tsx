"use client";
import { useEffect, useState } from "react";
import { DrawerPropsType } from "./type";

const Drawer = ({
  children,
  title,
  onClose,
  isOpen = true,
}: DrawerPropsType) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDragHandleClick = () => {
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`absolute w-full h-full az inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
      />

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gray-200 rounded-t-lg z-50 transform transition-transform duration-300 ease-out ${
          isAnimating ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className="w-12 h-1 bg-gray-700 mx-auto mt-4 mb-2 rounded-full cursor-pointer hover:bg-gray-600 transition-colors duration-200"
          onClick={handleDragHandleClick}
        />

        <div className="px-4 pb-4">
          <p className=" max-h-[70vh] text-xs overflow-y-auto text-gray-700-alt font-light text-center">
            {title}
          </p>
        </div>

        {children}
      </div>
    </>
  );
};

export default Drawer;
