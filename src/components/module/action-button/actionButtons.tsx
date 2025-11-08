"use client";
import TransformButton from "@/components/UI/transform-button";
import PlusActionIcon from "@/public/icons/PlusActionIcon";
import ReceiveActionIcon from "@/public/icons/ReceiveActionIcon";
import SendActionIcon from "@/public/icons/SendActionIcon";
import SwapActionIcon from "@/public/icons/SwapActionIcon";
import { useRouter } from "next/navigation";

const ActionButtons = () => {
  const router = useRouter();

  return (
    <div className="flex mt-7 justify-between items-center">
      <TransformButton
        icon={
          <SendActionIcon className="text-foreground" width={24} height={24} />
        }
        label="Send"
        clickHandler={() => router.push("/wallet/send")}
      />
      <TransformButton
        icon={
          <ReceiveActionIcon
            className="text-foreground"
            width={24}
            height={24}
          />
        }
        label="Receive"
        clickHandler={() => router.push("/wallet/receive")}
      />
      <TransformButton
        icon={
          <SwapActionIcon className="text-foreground" width={24} height={24} />
        }
        label="Swap"
        clickHandler={() => router.push("/swap")}
      />
      <TransformButton
        icon={
          <PlusActionIcon className="text-foreground" width={24} height={24} />
        }
        label="Invest"
        clickHandler={() => router.push("/wallet/invest")}
      />
    </div>
  );
};

export default ActionButtons;
