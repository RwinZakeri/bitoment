"use client";
import { profileItems } from "@/app/(with-layout)/profile/type";
import PageLayout from "@/components/layout/page/pageLayout";
import LinkedCard from "@/components/UI/link-card/LinkCard";
import axios from "@/config/axios.config";
import ProfileImage from "@/public/images/profile.png";
import { ProfileItem } from "@/types/global";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const Profile = () => {
  const { data: profileData } = useQuery({
    queryKey: [ReactQueryKey.profile],
    queryFn: async () => {
      const response = await axios.get("user/profile");
      return response.data;
    },
  });

  return (
    <PageLayout backHidden title="Profile">
      <div className="w-fit mx-auto flex flex-col gap-4 mt-11">
        <Image
          src={ProfileImage}
          width={80}
          height={80}
          alt="profile"
          className="w-20 h-20 rounded-full mx-auto"
        />
        <div className="flex flex-col gap-1.5 text-center ">
          <p className="text-base font-semibold text-black/70">
            {profileData?.user?.name || "Loading..."}
          </p>
          <p className="text-gray-400-alt">
            {profileData?.user?.email || "Loading..."}
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
