"use client";
import { FileCheckIcon } from "@/public/icons/FileCheckIcon";
import { FileLockIcon } from "@/public/icons/FileLockIcon";
import { GridFrameIcon } from "@/public/icons/GridFrameIcon";
import { HelpIcon } from "@/public/icons/HelpIcon";
import { SettingsIcon } from "@/public/icons/SettingsIcon";
import { UserProfileIcon } from "@/public/icons/UserProfileIcon";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslations } from "next-intl";

export interface profileItemsType {
  text: string;
  address: string;
  icon: ReactNode;
  id: string;
}

export const useProfileItems = (): Array<profileItemsType> => {
  const t = useTranslations();
  return [
    {
      id: uuidv4(),
      text: t("profile.profileInformation"),
      address: "/profile/profile-information",
      icon: <UserProfileIcon className="text-foreground" />,
    },
    {
      id: uuidv4(),
      text: t("profile.verification"),
      address: "/profile/verification",
      icon: <FileCheckIcon className="text-foreground" />,
    },
    {
      id: uuidv4(),
      text: t("profile.security"),
      address: "/profile/security",
      icon: <FileLockIcon className="text-foreground" />,
    },
    {
      id: uuidv4(),
      text: t("profile.settings"),
      address: "/profile/setting",
      icon: <SettingsIcon className="text-foreground" />,
    },
    {
      id: uuidv4(),
      text: t("profile.helpSupport"),
      address: "/profile/setting",
      icon: <HelpIcon className="text-foreground" />,
    },
    {
      id: uuidv4(),
      text: t("profile.aboutUs"),
      address: "/profile/about-us",
      icon: <GridFrameIcon className="text-foreground" />,
    },
  ];
};

