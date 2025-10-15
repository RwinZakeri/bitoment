import PageLayout from "@/components/layout/page/pageLayout";
import LinkedCard from "@/components/UI/link-card/LinkCard";
import ProfileImage from "@/public/images/profile.png";
import Image from "next/image";
import { profileItems, profileItemsType } from "./type";

const ProfilePage = () => {
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
            Jackson Cooper
          </p>
          <p className="text-gray-400-alt">jacksoncooper@gmail.com</p>
        </div>
      </div>

      <div className="flex flex-col mt-11 gap-2">
        {profileItems.map((item: profileItemsType) => (
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

export default ProfilePage;
