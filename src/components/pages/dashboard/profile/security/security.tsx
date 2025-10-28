"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import LinkedCard from "@/components/UI/link-card/LinkCard";
import axios from "@/config/axios.config";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";

const Security = () => {
  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKey.devices],
    queryFn: async () => {
      const response = await axios.get("auth/sessions");
      console.log(response);
      return response.data;
    },
    staleTime: 20000,
    gcTime: 20000,
  });

  return (
    <PageLayout title="Security">
      <div className="mt-8 flex flex-col gap-3">
        <LinkedCard
          label="Two-Factor Authentication"
          title="Two-factor is off"
          link="/profile/two-factor"
        />
        <LinkedCard
          label="Connected Devices"
          title={`${
            isLoading ? "finding..." : data?.sessions?.length
          } linked devices`}
          link="/profile/devices"
        />
        <LinkedCard
          label="Account Management"
          title="Lock user account"
          link="/"
        />
      </div>
    </PageLayout>
  );
};

export default Security;
