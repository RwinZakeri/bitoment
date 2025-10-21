import PageLayout from "@/components/layout/page/pageLayout";
import CardAndTitle from "@/components/module/TilteAndDescription/TilteAndDescription";
import Button from "@/components/UI/button";
import Input from "@/components/UI/input";
import EmailIcon from "@/public/icons/EmailIcon";
import EyeIcon from "@/public/icons/EyeIcon";
import GoogleIcon from "@/public/icons/GoogleIcon";
import LockIcon from "@/public/icons/LockIcon";
import UserIcon from "@/public/icons/UserIcon";
import Link from "next/link";

const SignUpPage = () => {
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

      <div className="flex flex-col gap-6 mt-6">
        <Input
          type="text"
          label="Full Name"
          placeholder="Hasan Mahmud"
          icon={<UserIcon className=" size-6" />}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          icon={<EmailIcon className=" size-6" />}
        />
        <Input
          label="Password"
          type="password"
          placeholder="*************"
          icon={<EyeIcon className=" size-6" />}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="*************"
          icon={<LockIcon className=" size-6" />}
        />
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <Button variant="filled" size="lg" className="w-full">
          Sign up
        </Button>
        <Button
          variant="outline-dark"
          size="lg"
          icon={<GoogleIcon fill="black" className="size-6" />}
          className="w-full"
        >
          Sign with Google{" "}
        </Button>

        <p className="text-gray-500 text-center text-sm font-normal">
          You have an account ?{" "}
          <Link href={"/sign-in"} className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default SignUpPage;
