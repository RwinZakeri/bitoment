"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import GoogleOAuth from "@/components/module/oAuth/googleOauth";
import CardAndTitle from "@/components/module/TilteAndDescription/TilteAndDescription";
import { Button } from "@/components/UI/button";
import Input from "@/components/UI/input";
import useGoogleOAuth from "@/hooks/useGoogleOAuth";
import { setCookie } from "@/lib/utils";
import EmailIcon from "@/public/icons/EmailIcon";
import UserIcon from "@/public/icons/UserIcon";
import { SignUpFormData, singUpSchema } from "@/schema/auth/authSchema";
import { SignUpResponse } from "@/types/auth";
import MutationKey from "@/types/mutation_key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
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
    onSuccess: (data) => {
      toast.success("Account created successfully");
      setCookie("token", data.data.token || "");
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "An error occurred";
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
      onSuccess: (data) => {
        const message = data.isNewUser
          ? "Account created successfully with Google"
          : "Signed in successfully with Google";
        toast.success(data.message || message);
        setCookie("token", data.token || "");
        router.push("/dashboard");
      },
      onError: (error) => {
        toast.error(error || "Google sign-up failed");
      },
    }
  );

  const handleGoogleSignUp = async () => {
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
          <div className="flex flex-col ">
            <span>Create</span>
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
          type="text"
          label="Full Name"
          placeholder="Hasan Mahmud"
          icon={<UserIcon className=" size-6" />}
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          icon={<EmailIcon className=" size-6" />}
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
        <Input
          label="Confirm Password"
          type="password"
          placeholder="*************"
          showPasswordToggle={true}
          {...register("passwordConfirmed")}
          error={errors.passwordConfirmed?.message}
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
            {isPending ? "Creating account..." : "Sign up"}
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
          You have an account ?{" "}
          <Link href={"/auth/sign-in"} className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default SignUp;
