"use client";
import TransformButton from "@/components/UI/transform-button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ActionButtons = () => {
  const router = useRouter();

  return (
    <div className="flex mt-7 justify-between items-center">
      <TransformButton
        icon={<Image src="/svgs/send.svg" alt="Send" width={24} height={24} />}
        label="Send"
        clickHandler={() => router.push("/wallet/send")}
      />
      <TransformButton
        icon={
          <Image src="/svgs/recieve.svg" alt="Receive" width={24} height={24} />
        }
        label="Receive"
        clickHandler={() => router.push("/wallet/receive")}
      />
      <TransformButton
        icon={<Image src="/svgs/swap.svg" alt="Swap" width={24} height={24} />}
        label="Swap"
        clickHandler={() => router.push("/swap")}
      />
      <TransformButton
        icon={<Image src="/svgs/plus.svg" alt="Add" width={24} height={24} />}
        label="Invest"
        clickHandler={() => router.push("/wallet/invest")}
      />
    </div>
  );
};

export default ActionButtons;
