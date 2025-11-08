"use client";
import CustomeInput from "@/components/UI/CustomeInput";
import Paper from "@/components/UI/paper";
import ToggleButton from "@/components/UI/toggle-buttom";
import axios from "@/config/axios.config";
import { handleCopyAddress } from "@/lib/utils";
import InfoIcon from "@/public/icons/InfoIcon";
import { GetPublicCpgLinkResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useMemo, useState } from "react";
import { CpgSinglePropsType } from "./type";

const PaymentSingle = ({ id }: CpgSinglePropsType) => {
  const [selectedOption, setSelectedOption] = useState("Address");

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

  // Generate a random wallet address (you can replace this with actual address from API)
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

  // Calculate amount with fee (you can adjust this logic)
  const amountWithFee = useMemo(() => {
    if (!data?.link?.price) return "0.00";
    const price = Number(data.link.price);
    const fee = price * 0.00072; // Example fee calculation
    return (price + fee).toFixed(8);
  }, [data?.link?.price]);

  // QR code value based on selected option
  const qrCodeValue = useMemo(() => {
    if (selectedOption === "Address") {
      return walletAddress;
    } else {
      // With Value - create a payment URI format
      return `${walletAddress}?amount=${data?.link?.price || 0}&currency=${
        data?.link?.currency || "USDT"
      }`;
    }
  }, [selectedOption, walletAddress, data?.link?.price, data?.link?.currency]);

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
                ? "Failed to load payment link"
                : "Payment link not found"}
            </p>
          </div>
        </div>
      </Paper>
    );
  }

  const link = data.link;
  const currency = link.currency || "USDT";
  const price = Number(link.price).toFixed(2);

  return (
    <Paper className="p-3 bg-white">
      <div className="shadow-sm rounded-lg overflow-hidden">
        <div className="flex flex-col gap-6">
          <div className=" px-3 py-5 flex flex-col bg-gray-200 gap-3">
            <div className="flex items-end gap-3">
              <Image
                src={"/svgs/bitoment.svg"}
                alt="bitoment"
                width={60}
                height={60}
              />
              <p className="">Bitoment</p>
            </div>
            <div>
              <p className="text-3xl font-bold">
                {price} {currency}
              </p>
            </div>
          </div>

          <div className="px-3 bg-white rounded-b-lg">
            <div className="flex gap-3 flex-col">
              <p className="text-xl font-semibold">{currency} • (TRC20)</p>
              <CustomeInput
                disabled
                variant="secondary"
                label="Amount"
                inputType="stroke"
                size={"sm"}
                value={`${amountWithFee} TRC20_${currency}`}
                icon={
                  <button onClick={() => handleCopyAddress(amountWithFee)}>
                    <Image
                      src={"/svgs/copyIcon.svg"}
                      alt=""
                      width={14}
                      height={14}
                    />
                  </button>
                }
              />
              <div>
                <CustomeInput
                  disabled
                  variant="secondary"
                  label="Address"
                  inputType="stroke"
                  size={"sm"}
                  value={walletAddress}
                  icon={
                    <button onClick={() => handleCopyAddress(walletAddress)}>
                      <Image
                        src={"/svgs/copyIcon.svg"}
                        alt=""
                        width={14}
                        height={14}
                      />
                    </button>
                  }
                />
                <p className="text-[10px] mt-1.5 font-extralight">
                  Min Transaction Amount • 10 {currency} (TRC20)
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
                        options={["Address", "Width Value"]}
                        state={selectedOption}
                        setState={setSelectedOption}
                      />
                    </div>
                    <p className="text-[0.75rem] flex py-4 text-gray-600">
                      <InfoIcon className="text-black" />
                      &nbsp;If you&apos;re sending the payment from an exchange,
                      ensure it doesn&apos;t deduct fees from the sent amount.
                      If it does, send the requested amount plus the exchange
                      fees to avoid underpayment.
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
