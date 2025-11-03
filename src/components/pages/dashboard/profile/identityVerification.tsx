"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { VerificationSkeleton } from "@/components/module/skeleton";
import Button from "@/components/UI/button";
import Checkbox from "@/components/UI/checkbox";
import CustomeInput from "@/components/UI/CustomeInput";
import Paper from "@/components/UI/paper";
import axios from "@/config/axios.config";
import {
  OptionalProfileUpdateFormData,
  optionalProfileUpdateSchema,
} from "@/schema/auth/authSchema";
import MutationKey from "@/types/mutation_key";
import ReactQueryKey from "@/types/react_query_key";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const IdentityVerification = () => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
  } = useForm<OptionalProfileUpdateFormData>({
    resolver: zodResolver(optionalProfileUpdateSchema),
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      nationalInsuranceNumber: "",
      birthDate: "",
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
        // Ensure phoneNumber is converted to string (handles both string and number types)
        phoneNumber: profileData.user.phoneNumber
          ? typeof profileData.user.phoneNumber === "string"
            ? profileData.user.phoneNumber
            : profileData.user.phoneNumber.toString()
          : "",
        nationalInsuranceNumber: profileData.user.nationalInsuranceNumber || "",
        birthDate: profileData.user.birthDate || "",
      });
    }
  }, [profileData, reset]);

  const { mutate: onSubmit, isPending } = useMutation({
    mutationKey: [MutationKey.updateProfile],
    mutationFn: async (data: OptionalProfileUpdateFormData) => {
      const response = await axios.put("user/profile", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Identity verification information updated successfully");
      // setIsModalOpen(true);
    },
    onError: (error) => {
      toast.error("Failed to update identity verification information");
      console.error("Identity verification update error:", error);
    },
  });

  if (isLoading) {
    return (
      <PageLayout title="identity verification">
        <VerificationSkeleton showPaper={true} fieldCount={3} />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="identity verification">
      <Paper className="mt-5">
        To ensure the security of your account, we kindly request that you
        provide the necessary information.
        <br />
        <br />
        All data provided will be handled with strict confidentiality and used
        solely for the purpose of fraud prevention and compliance with
        anti-money laundering regulations.
      </Paper>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="mt-10 flex flex-col gap-3"
      >
        <p className="mb-4">Please fill out the form below carefully:</p>

        <div>
          <CustomeInput
            placeholder="+1 (555) 000-0000"
            label="Phone Number"
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

        <div>
          <CustomeInput
            placeholder="AB123456C"
            label="National Insurance Number"
            {...register("nationalInsuranceNumber", {
              onChange: (e) => {
                e.target.value = e.target.value.toUpperCase();
              },
            })}
          />
          {errors.nationalInsuranceNumber && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.nationalInsuranceNumber.message}
            </span>
          )}
          {watchedFields.nationalInsuranceNumber &&
            !errors.nationalInsuranceNumber && (
              <span className="text-green-500 text-sm mt-1 block">
                ✓ Valid National Insurance Number
              </span>
            )}
        </div>

        <div>
          <CustomeInput
            placeholder="1990-08-15"
            type="date"
            label="Date of Birth"
            {...register("birthDate", {
              validate: (value) => {
                if (!value) return true; // Optional field
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                const actualAge =
                  monthDiff < 0 ||
                  (monthDiff === 0 && today.getDate() < birthDate.getDate())
                    ? age - 1
                    : age;

                if (actualAge < 18) {
                  return "You must be at least 18 years old";
                }
                if (actualAge > 120) {
                  return "Please enter a valid birth date";
                }
                return true;
              },
            })}
          />
          {errors.birthDate && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.birthDate.message}
            </span>
          )}
          {watchedFields.birthDate && !errors.birthDate && (
            <span className="text-green-500 text-sm mt-1 block">
              ✓ Valid birth date
            </span>
          )}
        </div>

        <div className="my-3">
          <Checkbox
            label="I agree to the terms and conditions of service."
            size="md"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
        </div>

        {isDirty && (
          <Button
            type="submit"
            size="lg"
            className="mx-auto px-6"
            disabled={!agreeToTerms || isPending || !isValid}
            loading={isPending}
          >
            {isPending ? "Saving..." : "Confirm"}
          </Button>
        )}

        {isDirty && !isValid && (
          <p className="text-amber-600 text-sm text-center mt-2">
            Please fix the validation errors above before submitting
          </p>
        )}
      </form>

      {/* <VerifyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </PageLayout>
  );
};

export default IdentityVerification;
