"use client";
import { useProfileItems } from "@/app/[locale]/(with-layout)/profile/type";
import PageLayout from "@/components/layout/page/pageLayout";
import { ProfileSkeleton } from "@/components/module/skeleton";
import LinkedCard from "@/components/UI/link-card";
import axios from "@/config/axios.config";
import ProfileImage from "@/public/images/profile.png";
import { ProfileItem } from "@/types/global";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Profile = () => {
  const t = useTranslations();
  const profileItems = useProfileItems();
  const { data: profileData, isLoading } = useQuery({
    queryKey: [ReactQueryKey.profile],
    queryFn: async () => {
      const response = await axios.get("user/profile");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <PageLayout backHidden title={t("profile.title")}>
        <ProfileSkeleton />
      </PageLayout>
    );
  }

  return (
    <PageLayout backHidden title={t("profile.title")}>
      <div className="w-fit mx-auto flex flex-col gap-4 mt-11">
        <Image
          src={ProfileImage}
          width={80}
          height={80}
          alt="profile"
          className="w-20 h-20 rounded-full mx-auto"
        />
        <div className="flex flex-col gap-1.5 text-center ">
          <p className="text-base font-semibold text-foreground/70">
            {profileData?.user?.name || t("profile.user")}
          </p>
          <p className="text-gray-400-alt">
            {profileData?.user?.email || t("profile.userExample")}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-11 gap-2">
        {profileItems.map((item: ProfileItem) => (
          <LinkedCard
            key={item.id}
            link={item.address}
            title={item.text}
            icon={item.icon}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default Profile;
