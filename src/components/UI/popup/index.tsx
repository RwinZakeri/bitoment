"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PopupProps } from "./type";

const Popup = ({
  isOpen,
  onClose,
  options,
  triggerRef,
  position = "bottom-right",
  className,
  optionClassName,
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const trigger = triggerRef.current;
      const rect = trigger.getBoundingClientRect();

      
      requestAnimationFrame(() => {
        const popup = popupRef.current;
        if (popup) {
          const popupRect = popup.getBoundingClientRect();
          let top = 0;
          let left = 0;

          switch (position) {
            case "bottom-right":
              top = rect.bottom + 8;
              left = rect.right - popupRect.width;
              break;
            case "bottom-left":
              top = rect.bottom + 8;
              left = rect.left;
              break;
            case "top-right":
              top = rect.top - popupRect.height - 8;
              left = rect.right - popupRect.width;
              break;
            case "top-left":
              top = rect.top - popupRect.height - 8;
              left = rect.left;
              break;
          }

          
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          if (left + popupRect.width > viewportWidth) {
            left = viewportWidth - popupRect.width - 8;
          }
          if (left < 8) {
            left = 8;
          }
          if (top + popupRect.height > viewportHeight) {
            top = viewportHeight - popupRect.height - 8;
          }
          if (top < 8) {
            top = 8;
          }

          setPopupPosition({ top, left });
        } else {
          
          let top = 0;
          let left = 0;
          const estimatedWidth = 160; 
          const estimatedHeight = options.length * 40 + 16; 

          switch (position) {
            case "bottom-right":
              top = rect.bottom + 8;
              left = rect.right - estimatedWidth;
              break;
            case "bottom-left":
              top = rect.bottom + 8;
              left = rect.left;
              break;
            case "top-right":
              top = rect.top - estimatedHeight - 8;
              left = rect.right - estimatedWidth;
              break;
            case "top-left":
              top = rect.top - estimatedHeight - 8;
              left = rect.left;
              break;
          }

          setPopupPosition({ top, left });
        }
      });
    } else {
      setPopupPosition(null);
    }
  }, [isOpen, triggerRef, position, options.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        triggerRef?.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <>
      
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      
      <div
        ref={popupRef}
        className={cn(
          "fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-300 py-2 min-w-[160px]",
          !popupPosition && "opacity-0 pointer-events-none",
          className
        )}
        style={
          popupPosition
            ? {
                top: `${popupPosition.top}px`,
                left: `${popupPosition.left}px`,
              }
            : { visibility: "hidden" }
        }
        role="menu"
        aria-orientation="vertical"
      >
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              if (!option.disabled) {
                option.onClick();
                onClose();
              }
            }}
            disabled={option.disabled}
            className={cn(
              "w-full px-2 py-1 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
              optionClassName
            )}
            role="menuitem"
          >
            <span className="flex items-center gap-2">
              <Image
                src={option.icon || ""}
                alt="sort mode"
                width={24}
                height={24}
              />
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Popup;
