import { FileCheckIcon } from "@/public/icons/FileCheckIcon";
import { FileLockIcon } from "@/public/icons/FileLockIcon";
import { GridFrameIcon } from "@/public/icons/GridFrameIcon";
import { HelpIcon } from "@/public/icons/HelpIcon";
import { SettingsIcon } from "@/public/icons/SettingsIcon";
import { UserProfileIcon } from "@/public/icons/UserProfileIcon";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export interface profileItemsType {
  text: string;
  address: string;
  icon: ReactNode;
  id: string;
}

export const profileItems: Array<profileItemsType> = [
  {
    id: uuidv4(),
    text: "Profile Information",
    address: "/profile/profile-information",
    icon: <UserProfileIcon />,
  },

  {
    id: uuidv4(),
    text: "Verification",
    address: "/profile/verification",
    icon: <FileCheckIcon />,
  },
  {
    id: uuidv4(),
    text: "Security",
    address: "/profile/security",
    icon: <FileLockIcon />,
  },
  {
    id: uuidv4(),
    text: "Settings",
    address: "/profile/setting",
    icon: <SettingsIcon />,
  },
  {
    id: uuidv4(),
    text: "Help & Support",
    address: "/profile/setting",
    icon: <HelpIcon />,
  },
  {
    id: uuidv4(),
    text: "About Us",
    address: "/profile/about-us",
    icon: <GridFrameIcon />,
  },
];
