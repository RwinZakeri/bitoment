"use client";
import TransformButton from "@/components/UI/transform-button";
import PlusActionIcon from "@/public/icons/PlusActionIcon";
import ReceiveActionIcon from "@/public/icons/ReceiveActionIcon";
import SendActionIcon from "@/public/icons/SendActionIcon";
import SwapActionIcon from "@/public/icons/SwapActionIcon";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const ActionButtons = () => {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className="flex mt-7 justify-between items-center">
      <TransformButton
        icon={
          <SendActionIcon className="text-foreground" width={24} height={24} />
        }
        label={t("wallet.send")}
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
        label={t("wallet.receive")}
        clickHandler={() => router.push("/wallet/receive")}
      />
      <TransformButton
        icon={
          <SwapActionIcon className="text-foreground" width={24} height={24} />
        }
        label={t("wallet.swap")}
        clickHandler={() => router.push("/swap")}
      />
      <TransformButton
        icon={
          <PlusActionIcon className="text-foreground" width={24} height={24} />
        }
        label={t("wallet.invest")}
        clickHandler={() => router.push("/wallet/invest")}
      />
    </div>
  );
};

export default ActionButtons;
