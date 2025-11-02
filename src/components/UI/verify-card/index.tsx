import check from "@/public/svgs/fill-check-circle.svg";
import uncheck from "@/public/svgs/stroke-check-circle.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../button";
import { verifyCardPropsType } from "./type";

const VerifyCard = ({
  img,
  steps,
  title,
  index,
  passedSteps,
  stepsLength,
}: verifyCardPropsType) => {
  console.log(stepsLength);
  const isPassed = passedSteps > index;

  const router = useRouter();
  return (
    <div
      className={`w-full relative rounded-lg p-4 ${
        isPassed ? "bg-cyan-200" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between ">
        <p className="text-black font-semibold text-base self-start">{title}</p>
        <Image src={img} alt={title} width={50} height={50} />
      </div>

      <div className="flex flex-col mt-1 gap-2">
        {steps?.map((item) => (
          <div className="flex gap-2" key={item.subStepName}>
            <Image
              src={item.isPassed ? check : uncheck}
              width="20"
              height="20"
              className="w-5"
              alt="check-icon"
            />
            <p className="text-sm font-light"> {item.subStepName}</p>
          </div>
        ))}
      </div>
      {index + 1 === passedSteps && (
        <div className="text-sm font-light bg-cyan-500 px-2 py-1 text-white rounded-xl ml-auto w-fit mt-6">
          Your Current Level
        </div>
      )}

      {stepsLength - passedSteps === index + 1 && !isPassed && (
        <Button
          onClick={() => {
            router.push("/profile/identity-verification");
          }}
          size="sm"
          className="cursor-pointer rounded-sm p-1.5 border-gray-400 text-xs mx-auto block mt-4 border-solid"
        >
          Continue Verification
        </Button>
      )}
    </div>
  );
};

export default VerifyCard;
