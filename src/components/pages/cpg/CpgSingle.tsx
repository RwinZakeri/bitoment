"use client";
import CustomeInput from "@/components/UI/CustomeInput";
import Paper from "@/components/UI/paper";
import ToggleButton from "@/components/UI/toggle-buttom";
import axios from "@/config/axios.config";
import { useCurrency } from "@/context/currencyContext";
import { handleCopyAddress } from "@/lib/utils";
import BitomentIcon from "@/public/icons/BitomentIcon";
import CopyIcon from "@/public/icons/CopyIcon";
import InfoIcon from "@/public/icons/InfoIcon";
import { GetPublicCpgLinkResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { useMemo, useState } from "react";
import { CpgSinglePropsType } from "./type";

const PaymentSingle = ({ id }: CpgSinglePropsType) => {
  const t = useTranslations();
  const { currency } = useCurrency();
  const [selectedOptionKey, setSelectedOptionKey] = useState<
    "address" | "amountWithValue"
  >("address");

  const { data, isLoading, isError } = useQuery({
    queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletCpgSingle, id],
    queryFn: async () => {
      const response = await axios.get<GetPublicCpgLinkResponse>(
        `/payment/${id}`
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const walletAddress = useMemo(() => {
    if (!data?.link?.link_id) return "";
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let address = "";
    const length = Math.floor(Math.random() * 10) + 26;
    for (let i = 0; i < length; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address;
  }, [data?.link]);

  const amountWithFee = useMemo(() => {
    if (!data?.link?.price) return "0.00";
    const price = Number(data.link.price);
    const fee = price * 0.00072;
    return (price + fee).toFixed(8);
  }, [data?.link?.price]);

  const qrCodeValue = useMemo(() => {
    if (selectedOptionKey === "address") {
      return walletAddress;
    } else {
      return `${walletAddress}?amount=${data?.link?.price || 0}&currency=${
        data?.link?.currency || currency
      }`;
    }
  }, [
    selectedOptionKey,
    walletAddress,
    data?.link?.price,
    data?.link?.currency,
    currency,
  ]);

  if (isLoading) {
    return (
      <Paper className="p-3 bg-white">
        <div className="shadow-sm rounded-lg overflow-hidden">
          <div className="flex flex-col gap-6">
            <div className="px-3 py-5 flex flex-col bg-gray-200 gap-3 animate-pulse">
              <div className="h-16 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="px-3 bg-white rounded-b-lg">
              <div className="flex gap-3 flex-col">
                <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  }

  if (isError || !data?.link) {
    return (
      <Paper className="p-3 bg-white">
        <div className="shadow-sm rounded-lg overflow-hidden">
          <div className="px-3 py-5 text-center">
            <p className="text-red-500">
              {isError
                ? t("wallet.failedToLoadPaymentLink")
                : t("wallet.paymentLinkNotFound")}
            </p>
          </div>
        </div>
      </Paper>
    );
  }

  const link = data.link;
  const displayCurrency = link.currency || currency;
  const price = Number(link.price).toFixed(2);

  return (
    <Paper className="p-3 bg-white">
      <div className="shadow-sm rounded-lg overflow-hidden">
        <div className="flex flex-col gap-6">
          <div className=" px-3 py-5 flex flex-col bg-gray-200 gap-3">
            <div className="flex items-end gap-3">
              <BitomentIcon
                width={60}
                height={60}
                className="text-foreground"
              />
              <p className="">Bitoment</p>
            </div>
            <div>
              <p className="text-3xl font-bold">
                {price} {displayCurrency}
              </p>
            </div>
          </div>

          <div className="px-3 bg-white rounded-b-lg">
            <div className="flex gap-3 flex-col">
              <p className="text-xl font-semibold">
                {displayCurrency} • (TRC20)
              </p>
              <CustomeInput
                disabled
                variant="secondary"
                label={t("wallet.amount")}
                inputType="stroke"
                size={"sm"}
                value={`${amountWithFee} TRC20_${displayCurrency}`}
                icon={
                  <button onClick={() => handleCopyAddress(amountWithFee)}>
                    <CopyIcon
                      width={14}
                      height={14}
                      className="text-foreground"
                    />
                  </button>
                }
              />
              <div>
                <CustomeInput
                  disabled
                  variant="secondary"
                  label={t("wallet.address")}
                  inputType="stroke"
                  size={"sm"}
                  value={walletAddress}
                  icon={
                    <button onClick={() => handleCopyAddress(walletAddress)}>
                      <CopyIcon
                        width={14}
                        height={14}
                        className="text-foreground"
                      />
                    </button>
                  }
                />
                <p className="text-[10px] mt-1.5 font-extralight">
                  {t("wallet.minTransactionAmount", {
                    amount: "10",
                    currency: displayCurrency,
                    network: "TRC20",
                  })}
                </p>
              </div>
              <div className="flex items-center justify-center py-6">
                <div className="relative inline-block group">
                  <div className="checkout__payment-qrcode">
                    <div className="qr-inner w-fit mx-auto relative overflow-hidden">
                      <QRCodeSVG
                        className="relative z-10"
                        value={qrCodeValue}
                        size={288}
                        level="M"
                        includeMargin={false}
                      />
                    </div>
                    <div className="py-4">
                      <ToggleButton
                        options={[
                          t("wallet.address"),
                          t("wallet.amountWithValue"),
                        ]}
                        state={
                          selectedOptionKey === "address"
                            ? t("wallet.address")
                            : t("wallet.amountWithValue")
                        }
                        setState={(value) => {
                          const addressText = t("wallet.address");
                          setSelectedOptionKey(
                            value === addressText
                              ? "address"
                              : "amountWithValue"
                          );
                        }}
                      />
                    </div>
                    <p className="text-[0.75rem] flex py-4 text-gray-600">
                      <InfoIcon className="text-foreground" />
                      &nbsp;{t("wallet.paymentInfo")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default PaymentSingle;
