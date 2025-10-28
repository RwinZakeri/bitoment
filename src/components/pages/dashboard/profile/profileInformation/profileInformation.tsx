"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import axios from "@/config/axios.config";
import { deleteCookie } from "@/lib/utils";
import { LogoutIcon } from "@/public/icons/LogoutIcon";
import MutationKey from "@/types/mutation_key";
import ReactQueryKey from "@/types/react_query_key";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfileInformation = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [showBtn, setShowBtn] = useState(false);
  const router = useRouter();
  const { data: profileData } = useQuery({
    queryKey: [ReactQueryKey.profile],
    queryFn: async () => {
      const response = await axios.get("user/profile");
      return response.data;
    },
  });

  useEffect(() => {
    setUserData({
      email: profileData?.user?.email,
      fullName: profileData?.user?.name,
      phoneNumber: profileData?.user?.phoneNumber,
    });
  }, [profileData]);

  const { mutate } = useMutation({
    mutationKey: [MutationKey.updateProfile],
    mutationFn: async () => {
      const response = await axios.put("user/profile", userData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("profile update successfully");
      setShowBtn(false);
      deleteCookie("token");
      router.refresh();
    },
    onError: (error) => {
      toast.error("update profile has an issue");
    },
  });

  const changeHander = (event) => {
    setShowBtn(true);
    setUserData((e) => ({ ...e, [event.target.name]: event.target.value }));
  };

  return (
    <PageLayout title="Profile Information">
      <div className="gap-2 flex flex-col mt-6">
        <CustomeInput
          label="Full Name"
          placeholder="John Smith"
          className="w-full"
          value={userData?.fullName}
          name={"fullName"}
          onChange={changeHander}
        />
        <CustomeInput
          label="Email"
          placeholder="example@gmail.com"
          className="w-full"
          value={userData?.email}
          name={"email"}
          onChange={changeHander}
        />
        <CustomeInput
          label="Phone Number"
          placeholder="+1 (555) 000-0000"
          className="w-full"
          value={userData?.phoneNumber}
          name="phoneNumber"
          onChange={changeHander}
        />
      </div>

      {showBtn && (
        <Button
          onClick={() => {
            !!userData.email.trim.length
              ? mutate()
              : toast.error("email cant not be empty");
          }}
          size="lg"
          className="mx-auto block my-6"
        >
          Save Changes
        </Button>
      )}

      <div>
        <Button
          onClick={() => {
            deleteCookie("token");
            router.push("/welcome");
          }}
          icon={<LogoutIcon />}
          className="w-full mt-12"
          size="lg"
        >
          Log Out
        </Button>
      </div>
    </PageLayout>
  );
};

export default ProfileInformation;
