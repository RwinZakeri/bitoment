import PageLayout from "@/components/layout/page/pageLayout";
import TilteAndDescription from "@/components/TilteAndDescription/TilteAndDescription";
import Button from "@/components/UI/button";
import Input from "@/components/UI/input";
import EmailIcon from "@/public/icons/EmailIcon";
import EyeIcon from "@/public/icons/EyeIcon";
import GoogleIcon from "@/public/icons/GoogleIcon";
import Link from "next/link";

const SignInPage = () => {
  return (
    <PageLayout>
      <TilteAndDescription
        className="mt-52"
        title="Sign in
your account"
        description="cryptocurrency wallet mobile apps available for
managing and storing your digital assets."
      />

      <div className="mt-8 flex flex-col gap-6">
        <Input
          type="email"
          label="Email"
          placeholder="example@gmail.com"
          icon={<EmailIcon className="size-6" />}
        />
        <Input
          type="password"
          label="Password"
          placeholder="*************"
          icon={<EyeIcon className="size-6" />}
        />

        <Link
          className="text-gray-500 font-normal underline decoration-solid underline-offset-auto"
          style={{
            fontFamily: "Poppins",
            textDecorationSkipInk: "none",
            textDecorationThickness: "auto",
            textUnderlinePosition: "from-font",
          }}
          href={"/forgot-password"}
        >
          Forgot Password?
        </Link>
        <Button variant="filled" size="lg" className="w-full">
          Sign In
        </Button>
        <Button
          variant="outline-dark"
          icon={<GoogleIcon fill="black" className="size-6" />}
          size="md"
          className="w-full"
        >
          Sign with Google
        </Button>

        <p className="text-gray-500 text-center text-sm font-normal">
          Don&apos;t have an account ?{" "}
          <Link href={"/sign-up"} className="text-blue-500 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default SignInPage;
