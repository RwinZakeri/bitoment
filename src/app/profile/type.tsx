import { FileCheckIcon } from "@/public/icons/FileCheckIcon";
import { FileLockIcon } from "@/public/icons/FileLockIcon";
import { GridFrameIcon } from "@/public/icons/GridFrameIcon";
import { HelpIcon } from "@/public/icons/HelpIcon";
import { SettingsIcon } from "@/public/icons/SettingsIcon";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserProfileIcon } from "../../../public/icons/UserProfileIcon";

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
    address: "/",
    icon: <UserProfileIcon />,
  },

  {
    id: uuidv4(),
    text: "Verification",
    address: "/",
    icon: <FileCheckIcon />,
  },
  {
    id: uuidv4(),
    text: "Security",
    address: "/",
    icon: <FileLockIcon />,
  },
  {
    id: uuidv4(),
    text: "Settings",
    address: "/",
    icon: <SettingsIcon />,
  },
  {
    id: uuidv4(),
    text: "Help & Support",
    address: "/",
    icon: <HelpIcon />,
  },
  {
    id: uuidv4(),
    text: "About Us",
    address: "/",
    icon: <GridFrameIcon />,
  },
];
