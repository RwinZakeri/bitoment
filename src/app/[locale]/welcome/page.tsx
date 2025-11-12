"use client";

import { Button } from "@/components/UI/button";
import useGoogleOAuth from "@/hooks/useGoogleOAuth";
import { useRouter } from "@/i18n/routing";
import { redirectToDashboardWithLocale, setCookie } from "@/lib/utils";
import GoogleIcon from "@/public/icons/GoogleIcon";
import ProfileAddIcon from "@/public/icons/ProfileAddIcon";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import toast from "react-hot-toast";

const WelcomePage = () => {
  const router = useRouter();
  const t = useTranslations();

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const googleScope =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

  const { signInWithGoogle, isLoading: isGoogleLoading } = useGoogleOAuth(
    {
      clientId: googleClientId,
      scope: googleScope,
      redirectUri: typeof window !== "undefined" ? window.location.origin : "",
    },
    {
      onSuccess: async (data) => {
        toast.success(data.message || t("welcome.signedInSuccessfully"));
        setCookie("token", data.token || "");
        await redirectToDashboardWithLocale(router);
      },
      onError: (error) => {
        toast.error(error || t("welcome.googleSignInFailed"));
      },
    }
  );

  const handleGoogleSignIn = async () => {
    if (!googleClientId) {
      toast.error(t("welcome.googleOAuthNotConfigured"));
      return;
    }
    await signInWithGoogle();
  };

  useEffect(() => {
    if (!googleClientId || typeof window === "undefined") return;

    if (window.google) {
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error("Failed to load Google Sign-In script");
    };
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, [googleClientId]);

  return (
    <div className="w-full p-4 relative h-screen bg-cyan-400 flex items-center justify-center">
      <div className="z-0 absolute w-full h-full bg-[url('/images/welcome_background.png')] bg-cover bg-bottom-left opacity-100"></div>
      <div className="w-full z-10 relative ">
        <h1 className="text-white text-2xl font-semibold text-center">
          {t("welcome.title")}
        </h1>
        <div className="h-1.5 w-8 bg-white opacity-[36%] mx-auto mt-12 mb-20"></div>
        <div className="flex flex-col gap-6">
          <Button
            variant="filled"
            size="lg"
            onClick={() => router.push("/auth/sign-in")}
            className="w-full"
          >
            {t("welcome.login")}
          </Button>
          <Button
            icon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            variant="outline"
            size="lg"
            className="w-full"
            disabled={isGoogleLoading || !googleClientId}
            loading={isGoogleLoading}
          >
            {isGoogleLoading
              ? t("welcome.signingIn")
              : t("welcome.signWithGoogle")}
          </Button>

          <div className="flex items-center justify-center gap-2">
            <span className="w-10 h-[1px] bg-white/50"></span>
            <span className="text-white/50 font-medium text-xs">
              {t("common.or")}
            </span>
            <span className="w-10 h-[1px] bg-white/50"></span>
          </div>

          <Button
            onClick={() => router.push("/auth/sign-up")}
            icon={<ProfileAddIcon />}
            variant="outline"
            size="lg"
            className="w-full"
          >
            {t("welcome.createNewAccount")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
