"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import GoogleOAuth from "@/components/module/oAuth/googleOauth";
import CardAndTitle from "@/components/module/TilteAndDescription/TilteAndDescription";
import { Button } from "@/components/UI/button";
import Input from "@/components/UI/input";
import useGoogleOAuth from "@/hooks/useGoogleOAuth";
import { setCookie, redirectToDashboardWithLocale } from "@/lib/utils";
import EmailIcon from "@/public/icons/EmailIcon";
import UserIcon from "@/public/icons/UserIcon";
import { SignUpFormData, singUpSchema } from "@/schema/auth/authSchema";
import { SignUpResponse } from "@/types/auth";
import MutationKey from "@/types/mutation_key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { translateErrorMessage } from "@/lib/translateErrors";

const SignUp = () => {
  const router = useRouter();
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(singUpSchema),
  });

  const { mutate: onSubmit, isPending } = useMutation({
    mutationKey: [MutationKey.signUp],
    mutationFn: async (data: SignUpFormData) => {
      const response = await axios.post<SignUpResponse>(
        "/api/auth/signup",
        data
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response;
    },
    onSuccess: async (data) => {
      toast.success(t("auth.signUp.accountCreatedSuccessfully"));
      setCookie("token", data.data.token || "");
      await redirectToDashboardWithLocale(router);
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || t("errors.generic");
      toast.error(errorMessage);
    },
  });

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
        const message = data.isNewUser
          ? t("auth.signUp.accountCreatedWithGoogle")
          : t("auth.signUp.signedInWithGoogle");
        toast.success(data.message || message);
        setCookie("token", data.token || "");
        await redirectToDashboardWithLocale(router);
      },
      onError: (error) => {
        toast.error(error || t("auth.signUp.googleSignUpFailed"));
      },
    }
  );

  const handleGoogleSignUp = async () => {
    if (!googleClientId) {
      toast.error(t("auth.signUp.googleOAuthNotConfigured"));
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
    <PageLayout>
      <CardAndTitle
        className="mt-20"
        title={
          <div className="flex flex-col ">
            <span>{t("auth.signUp.title")}</span>
            <span>{t("auth.signUp.yourAccount")}</span>
          </div>
        }
        description={t("auth.signUp.description")}
      />

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-6 mt-6"
      >
        <Input
          type="text"
          label={t("auth.signUp.fullName")}
          placeholder={t("auth.signUp.fullNamePlaceholder")}
          icon={<UserIcon className=" size-6" />}
          {...register("fullName")}
          error={errors.fullName?.message ? translateErrorMessage(errors.fullName.message, t) : undefined}
        />
        <Input
          type="email"
          label={t("auth.signUp.email")}
          placeholder={t("auth.signUp.enterEmail")}
          icon={<EmailIcon className=" size-6" />}
          {...register("email")}
          error={errors.email?.message ? translateErrorMessage(errors.email.message, t) : undefined}
        />
        <Input
          label={t("auth.signUp.password")}
          type="password"
          placeholder="*************"
          showPasswordToggle={true}
          {...register("password")}
          error={errors.password?.message ? translateErrorMessage(errors.password.message, t) : undefined}
        />
        <Input
          label={t("auth.signUp.confirmPassword")}
          type="password"
          placeholder="*************"
          showPasswordToggle={true}
          {...register("passwordConfirmed")}
          error={errors.passwordConfirmed?.message ? translateErrorMessage(errors.passwordConfirmed.message, t) : undefined}
        />
        <div className="mt-8 flex flex-col gap-4">
          <Button
            type="submit"
            variant="filled"
            size="lg"
            className="w-full"
            disabled={isPending}
            loading={isPending}
          >
            {isPending ? t("auth.signUp.creatingAccount") : t("auth.signUp.signUpButton")}
          </Button>
        </div>
      </form>
      <div className="mt-8 flex flex-col gap-4">
        <GoogleOAuth
          onClick={handleGoogleSignUp}
          isLoading={isGoogleLoading}
          disabled={!googleClientId}
        />

        <p className="text-gray-500 text-center text-sm font-normal">
          {t("auth.signUp.youHaveAccount")}{" "}
          <Link href={"/auth/sign-in"} className="text-blue-500 font-semibold">
            {t("auth.signUp.login")}
          </Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default SignUp;
