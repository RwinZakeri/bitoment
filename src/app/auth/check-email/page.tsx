import TilteAndDescription from "@/components/module/TilteAndDescription/TilteAndDescription";
import Button from "@/components/UI/button";
import EmailSvg from "@/public/svgs/verify-illustrat.svg";
import Image from "next/image";
import Link from "next/link";

const CheckEmailPage = () => {
  return (
    <div className="px-8 py-8">
      <Image
        src={EmailSvg}
        alt="check email"
        className="block mx-auto"
        width={240}
        height={240}
      />
      <TilteAndDescription
        className="mt-6"
        title="Check your email"
        description="We have sent a password recover instructions
to your email."
      />

      <div className="flex flex-col gap-6 mt-6">
        <Button size="lg" className="w-full ">
          Open Email App
        </Button>

        <p className="text-gray-500 text-center text-sm font-normal">
          Skip, I’ll confirm later
        </p>

        <p className="text-gray-500  text-sm font-normal">
          Did not receive the email? Check your Spam folder or{" "}
          <Link
            href={"/forgot-password"}
            className="text-blue-500 font-semibold"
          >
            try another email address.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
