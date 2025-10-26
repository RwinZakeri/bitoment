"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import CardAndTitle from "@/components/module/TilteAndDescription/TilteAndDescription";
import { Button } from "@/components/UI/button";
import Input from "@/components/UI/input";
import { setCookie } from "@/lib/utils";
import EmailIcon from "@/public/icons/EmailIcon";
import GoogleIcon from "@/public/icons/GoogleIcon";
import UserIcon from "@/public/icons/UserIcon";
import { SignUpFormData, singUpSchema } from "@/schema/auth/authSchema";
import { SignUpResponse } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
      router.push("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

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
        <Button
          onClick={() => router.push("/auth/sign-in")}
          variant="outline-dark"
          size="sm"
          icon={<GoogleIcon fill="black" className="size-6" />}
          className="w-full"
        >
          Sign with Google{" "}
        </Button>

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
