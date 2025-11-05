"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import CryptoCard from "@/components/UI/crypto-card";
import Modal from "@/components/UI/modal";
import VerifyInput from "@/components/UI/verify-input";
import axios from "@/config/axios.config";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { CryptoCurrency, SelectAssetModalProps } from "./type";

const SelectAssetModal = ({
  isOpen,
  onClose,
  onClick,
}: SelectAssetModalProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKey.allCrypto],
    queryFn: async () => {
      const res = await axios.get("/crypto");
      return res.data;
    },
  });

  const handleAssetClick = (item: CryptoCurrency) => {
    onClick(item);
    onClose();
  };

  const [search, setSearch] = useState("");

  const filteredData = data?.data?.filter((item: CryptoCurrency) => {
    if (!search.trim()) return true;
    const searchLower = search.toLowerCase().trim();
    return (
      item.name.toLowerCase() === searchLower ||
      item.shortName.toLowerCase() === searchLower
    );
  });

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <Modal
      modalMargin={0}
      modalPadding={0}
      className="bg-gray-200 overflow-scroll w-full h-full"
      isOpen={isOpen}
      onClose={onClose}
      close={true}
    >
      <PageLayout backHidden title="Select Asset to Buy">
        <div className="mt-10">
          <VerifyInput
            inputSize="sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Crypto..."
          />
        </div>
        <div className="my-4 flex flex-col gap-3">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item: CryptoCurrency) => (
              <div key={item.percentage} onClick={() => handleAssetClick(item)}>
                <CryptoCard
                  title={item.name}
                  cryptoName="BTC"
                  label="BTC"
                  icon={
                    <Image src={item.icon} alt="issue" width={17} height={17} />
                  }
                  price={"7,367.78"}
                  amount="+2.32%"
                  cardType="asset"
                />
              </div>
            ))
          ) : search.trim() && (!filteredData || filteredData.length === 0) ? (
            <div className="text-center py-8 text-gray-500">No items found</div>
          ) : null}
        </div>
      </PageLayout>
    </Modal>
  );
};

export default SelectAssetModal;
