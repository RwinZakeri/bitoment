"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import CardAndTitle from "@/components/module/TilteAndDescription/TilteAndDescription";
import { Button } from "@/components/UI/button";
import Input from "@/components/UI/input";
import useGoogleOAuth from "@/hooks/useGoogleOAuth";
import { setCookie } from "@/lib/utils";
import EmailIcon from "@/public/icons/EmailIcon";
import GoogleIcon from "@/public/icons/GoogleIcon";
import { SignInFormData, signInSchema } from "@/schema/auth/authSchema";
import { SignInResponse } from "@/types/auth";
import MutationKey from "@/types/mutation_key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
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
    onSuccess: (data) => {
      toast.success("Signed in successfully");
      setCookie("token", data.data.token || "");
      router.push("/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Sign in failed");
    },
  });

  // Google OAuth configuration
  const googleClientId = "47927692045-n3k4gsded2e4u5l266gs47nn48kubp7e.apps.googleusercontent.c";
  const googleScope =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

  const { signInWithGoogle, isLoading: isGoogleLoading } = useGoogleOAuth(
    {
      clientId: googleClientId,
      scope: googleScope,
      redirectUri: typeof window !== "undefined" ? window.location.origin : "",
    },
    {
      onSuccess: (data) => {
        toast.success(data.message || "Signed in successfully with Google");
        setCookie("token", data.token || "");
        router.push("/dashboard");
      },
      onError: (error) => {
        toast.error(error || "Google sign-in failed");
      },
    }
  );

  const handleGoogleSignIn = async () => {
    if (!googleClientId) {
      toast.error(
        "Google OAuth is not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID"
      );
      return;
    }
    await signInWithGoogle();
  };

  // Load Google Sign-In script
  useEffect(() => {
    if (!googleClientId || typeof window === "undefined") return;

    // Check if script is already loaded
    if (window.google) {
      return;
    }

    // Check if script is already in DOM
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
      // Only remove if we added it and it still exists
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
            <span>Sign in</span>
            <span>your account</span>
          </div>
        }
        description="cryptocurrency wallet mobile apps available for
        managing and storing your digital assets."
      />

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-6 mt-6"
      >
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          icon={<EmailIcon className="size-6" />}
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          placeholder="*************"
          showPasswordToggle={true}
          {...register("password")}
          error={errors.password?.message}
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
          Forgot Password?
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
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>

      <div className="mt-8 flex flex-col gap-4">
        <Button
          variant="outline-dark"
          size="sm"
          icon={<GoogleIcon fill="black" className="size-6" />}
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || !googleClientId}
          loading={isGoogleLoading}
        >
          {isGoogleLoading ? "Signing in..." : "Sign with Google"}
        </Button>

        <p className="text-gray-500 text-center text-sm font-normal">
          Don&apos;t have an account ?{" "}
          <Link
            href={"/auth/sign-up"}
            className="cursor-pointer text-blue-500 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default SignIn;
