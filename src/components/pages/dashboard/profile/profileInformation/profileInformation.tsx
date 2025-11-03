"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { FormSkeleton } from "@/components/module/skeleton";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import axios from "@/config/axios.config";
import { deleteCookie } from "@/lib/utils";
import { LogoutIcon } from "@/public/icons/LogoutIcon";
import {
  ProfileUpdateFormData,
  profileUpdateSchema,
} from "@/schema/auth/authSchema";
import MutationKey from "@/types/mutation_key";
import ReactQueryKey from "@/types/react_query_key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProfileInformation = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const watchedFields = watch();

  const { data: profileData, isLoading } = useQuery({
    queryKey: [ReactQueryKey.profile],
    queryFn: async () => {
      const response = await axios.get("user/profile");
      return response.data;
    },
  });

  useEffect(() => {
    if (profileData?.user) {
      reset({
        fullName: profileData.user.name || "",
        email: profileData.user.email || "",
        // Ensure phoneNumber is converted to string (handles both string and number types)
        phoneNumber: profileData.user.phoneNumber
          ? typeof profileData.user.phoneNumber === "string"
            ? profileData.user.phoneNumber
            : profileData.user.phoneNumber.toString()
          : "",
      });
    }
  }, [profileData, reset]);

  const { mutate: onSubmit, isPending } = useMutation({
    mutationKey: [MutationKey.updateProfile],
    mutationFn: async (data: ProfileUpdateFormData) => {
      const response = await axios.put("user/profile", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      reset();
    },
    onError: (error) => {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    },
  });

  if (isLoading) {
    return (
      <PageLayout title="Profile Information">
        <FormSkeleton fieldCount={3} showButton={true} />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Profile Information">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="gap-2 flex flex-col mt-6"
      >
        <div>
          <CustomeInput
            label="Full Name"
            placeholder="John Smith"
            className="w-full"
            {...register("fullName")}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.fullName.message}
            </span>
          )}
          {watchedFields.fullName && !errors.fullName && (
            <span className="text-green-500 text-sm mt-1 block">
              ✓ Valid name
            </span>
          )}
        </div>

        <div>
          <CustomeInput
            label="Email"
            placeholder="example@gmail.com"
            className="w-full"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.email.message}
            </span>
          )}
          {watchedFields.email && !errors.email && (
            <span className="text-green-500 text-sm mt-1 block">
              ✓ Valid email address
            </span>
          )}
        </div>

        <div>
          <CustomeInput
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            className="w-full"
            type="tel"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.phoneNumber.message}
            </span>
          )}
          {watchedFields.phoneNumber && !errors.phoneNumber && (
            <span className="text-green-500 text-sm mt-1 block">
              ✓ Valid phone number
            </span>
          )}
        </div>

        {isDirty && (
          <Button
            type="submit"
            size="lg"
            className="mx-auto block my-6"
            disabled={isPending || !isValid}
            loading={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        )}

        {isDirty && !isValid && (
          <p className="text-amber-600 text-sm text-center mt-2">
            Please fix the validation errors above before submitting
          </p>
        )}
      </form>

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
