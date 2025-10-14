"use client";

import Button from "@/components/UI/button";
import GoogleIcon from "@/public/icons/GoogleIcon";
import ProfileAddIcon from "@/public/icons/ProfileAddIcon";

const WelcomePage = () => {
  return (
    <div className="w-full p-4 relative h-screen bg-green-500 flex items-center justify-center">
      <div className="z-0 absolute w-full h-full bg-[url('/images/welcome_background.png')] bg-cover bg-bottom-left opacity-100"></div>
      <div className="w-full z-10 relative ">
        <h1 className="text-white text-2xl font-semibold text-center">
          Welcome to Bitoment!
        </h1>
        <div className="h-1.5 w-8 bg-white opacity-[36%] mx-auto mt-12 mb-20"></div>
        <div className="flex flex-col gap-6">
          <Button variant="filled" className="w-full">
            Sign with Google
          </Button>
          <Button icon={<GoogleIcon />} variant="outline" className="w-full">
            Sign with Google
          </Button>

          <div className="flex items-center justify-center gap-2">
            <span className="w-10 h-[1px] bg-light-white"></span>
            <span className="text-light-white text-xs">OR</span>
            <span className="w-10 h-[1px] bg-light-white"></span>
          </div>

          <Button
            icon={<ProfileAddIcon />}
            variant="outline"
            className="w-full"
          >
            Create new account{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
