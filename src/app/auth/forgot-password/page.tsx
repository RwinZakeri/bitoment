"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import TilteAndDescription from "@/components/module/TilteAndDescription/TilteAndDescription";
import Button from "@/components/UI/button";
import Input from "@/components/UI/input";
import UserNavigationBack from "@/hooks/useNavigationBack";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const { goBack } = UserNavigationBack();
  const router = useRouter();
  return (
    <PageLayout title="Forgot Password">
      <TilteAndDescription
        className="mt-28 mb-24"
        description="Enter the email associated with your account
and we’ll send an email with instructions to reset
your password."
      />

      <Input type="email" label="Email" placeholder="example@gmail.com" />
      <Button
        className="w-full mt-6"
        size="lg"
        onClick={() => router.push("/auth/check-email")}
      >
        Send
      </Button>

      <Button
        onClick={goBack}
        variant="text"
        size="lg"
        className="text-blue-500 absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        Back to again{" "}
      </Button>
    </PageLayout>
  );
};

export default ForgotPasswordPage;
