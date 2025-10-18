"use client";
import { useRouter } from "next/navigation";

const UserNavigationBack = (baseUrl: string = "/") => {
  const router = useRouter();
  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(baseUrl);
    }
  };
  return {
    goBack,
    isBack: typeof window !== "undefined" && window.history.length > 1,
  };
};

export default UserNavigationBack;
