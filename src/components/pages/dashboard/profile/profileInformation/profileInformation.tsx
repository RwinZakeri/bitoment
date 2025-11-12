"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { FormSkeleton } from "@/components/module/skeleton";
import Button from "@/components/UI/button";
import CustomeInput from "@/components/UI/CustomeInput";
import axios from "@/config/axios.config";
import { translateErrorMessage } from "@/lib/translateErrors";
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
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProfileInformation = () => {
  const router = useRouter();
  const t = useTranslations();

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
      toast.success(t("profile.profileUpdatedSuccessfully"));
      reset();
    },
    onError: (error) => {
      toast.error(t("errors.failedToUpdateProfile"));
      console.error("Profile update error:", error);
    },
  });

  if (isLoading) {
    return (
      <PageLayout title={t("profile.profileInformation")}>
        <FormSkeleton fieldCount={3} showButton={true} />
      </PageLayout>
    );
  }

  return (
    <PageLayout title={t("profile.profileInformation")}>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="gap-2 flex flex-col mt-6"
      >
        <div>
          <CustomeInput
            label={t("profile.fullName")}
            placeholder="John Smith"
            className="w-full"
            {...register("fullName")}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm mt-1 block">
              {translateErrorMessage(errors.fullName.message || "", t)}
            </span>
          )}
          {watchedFields.fullName && !errors.fullName && (
            <span className="text-green-500 text-sm mt-1 block">
              {t("profile.validName")}
            </span>
          )}
        </div>

        <div>
          <CustomeInput
            label={t("profile.email")}
            placeholder="example@gmail.com"
            className="w-full"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 block">
              {translateErrorMessage(errors.email.message || "", t)}
            </span>
          )}
          {watchedFields.email && !errors.email && (
            <span className="text-green-500 text-sm mt-1 block">
              {t("profile.validEmail")}
            </span>
          )}
        </div>

        <div>
          <CustomeInput
            label={t("profile.phoneNumber")}
            placeholder="+1 (555) 000-0000"
            className="w-full"
            type="tel"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm mt-1 block">
              {translateErrorMessage(errors.phoneNumber.message || "", t)}
            </span>
          )}
          {watchedFields.phoneNumber && !errors.phoneNumber && (
            <span className="text-green-500 text-sm mt-1 block">
              {t("profile.validPhoneNumber")}
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
            {isPending ? t("profile.saving") : t("profile.saveChanges")}
          </Button>
        )}

        {isDirty && !isValid && (
          <p className="text-amber-600 text-sm text-center mt-2">
            {t("profile.fixValidationErrors")}
          </p>
        )}
      </form>

      <div>
        <Button
          onClick={() => {
            deleteCookie("token");
            router.push("/welcome");
          }}
          icon={<LogoutIcon className="text-foreground" />}
          className="w-full mt-12"
          size="lg"
        >
          {t("profile.logOut")}
        </Button>
      </div>
    </PageLayout>
  );
};

export default ProfileInformation;
