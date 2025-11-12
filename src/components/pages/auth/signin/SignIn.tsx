"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import CardAndTitle from "@/components/module/TilteAndDescription/TilteAndDescription";
import { Button } from "@/components/UI/button";
import Input from "@/components/UI/input";
import useGoogleOAuth from "@/hooks/useGoogleOAuth";
import { useRouter } from "@/i18n/routing";
import { translateErrorMessage } from "@/lib/translateErrors";
import { redirectToDashboardWithLocale, setCookie } from "@/lib/utils";
import EmailIcon from "@/public/icons/EmailIcon";
import GoogleIcon from "@/public/icons/GoogleIcon";
import { SignInFormData, signInSchema } from "@/schema/auth/authSchema";
import { SignInResponse } from "@/types/auth";
import MutationKey from "@/types/mutation_key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate: onSubmit, isPending } = useMutation({
    mutationKey: [MutationKey.signIn],
    mutationFn: async (data: SignInFormData) => {
      const response = await axios.post<SignInResponse>(
        "/api/auth/signin",
        data
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response;
    },
    onSuccess: async (data) => {
      toast.success(t("auth.signIn.signedInSuccessfully"));
      setCookie("token", data.data.token || "");
      await redirectToDashboardWithLocale(router);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message || t("auth.signIn.signInFailed")
      );
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
        toast.success(data.message || t("auth.signIn.signedInWithGoogle"));
        setCookie("token", data.token || "");
        await redirectToDashboardWithLocale(router);
      },
      onError: (error) => {
        toast.error(error || t("auth.signIn.googleSignInFailed"));
      },
    }
  );

  const handleGoogleSignIn = async () => {
    if (!googleClientId) {
      toast.error(t("auth.signIn.googleOAuthNotConfigured"));
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
          <div className="flex flex-col">
            <span>{t("auth.signIn.title")}</span>
            <span>{t("auth.signIn.yourAccount")}</span>
          </div>
        }
        description={t("auth.signIn.description")}
      />

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-6 mt-6"
      >
        <Input
          type="email"
          label={t("auth.signIn.email")}
          placeholder={t("auth.signIn.enterEmail")}
          icon={<EmailIcon className="size-6" />}
          {...register("email")}
          error={
            errors.email?.message
              ? translateErrorMessage(errors.email.message, t)
              : undefined
          }
        />
        <Input
          label={t("auth.signIn.password")}
          type="password"
          placeholder="*************"
          showPasswordToggle={true}
          {...register("password")}
          error={
            errors.password?.message
              ? translateErrorMessage(errors.password.message, t)
              : undefined
          }
        />

        <Link
          className="text-gray-500 font-normal underline decoration-solid underline-offset-auto"
          style={{
            fontFamily: "Poppins",
            textDecorationSkipInk: "none",
            textDecorationThickness: "auto",
            textUnderlinePosition: "from-font",
          }}
          href={"/auth/forgot-password"}
        >
          {t("auth.signIn.forgotPassword")}
        </Link>

        <div className="mt-8 flex flex-col gap-4">
          <Button
            type="submit"
            variant="filled"
            size="lg"
            className="w-full"
            disabled={isPending}
            loading={isPending}
          >
            {isPending
              ? t("auth.signIn.signingIn")
              : t("auth.signIn.signInButton")}
          </Button>
        </div>
      </form>

      <div className="mt-8 flex flex-col gap-4">
        <Button
          variant="outline-dark"
          size="sm"
          icon={<GoogleIcon className="size-6 text-foreground" />}
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || !googleClientId}
          loading={isGoogleLoading}
        >
          {isGoogleLoading
            ? t("auth.signIn.signingIn")
            : t("auth.signIn.signWithGoogle")}
        </Button>

        <p className="text-gray-500 text-center text-sm font-normal">
          {t("auth.signIn.dontHaveAccount")}{" "}
          <Link
            href={"/auth/sign-up"}
            className="cursor-pointer text-blue-500 font-semibold"
          >
            {t("auth.signIn.signUp")}
          </Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default SignIn;
