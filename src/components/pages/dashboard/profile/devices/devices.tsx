"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import { DeviceCardSkeleton } from "@/components/module/skeleton";
import DeviceCard from "@/components/UI/deviceCard";
import Paper from "@/components/UI/paper";
import axios from "@/config/axios.config";
import { LoginSession } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useQuery } from "@tanstack/react-query";

const Devices = () => {
  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKey.devices],
    queryFn: async () => {
      const response = await axios.get("auth/sessions");
      return response.data;
    },
  });

  return (
    <PageLayout title="Devices">
      <Paper label="Devices" className="pt-4 pb-0 gap-2 flex flex-col">
        <div className=" flex flex-col gap-6">
          {isLoading ? (
            <DeviceCardSkeleton count={3} />
          ) : (
            data?.sessions?.map((session: LoginSession) => (
              <DeviceCard
                key={session.id}
                isDevice={false}
                title={session.device_name || "unknown"}
                deviceName={session.os || "unknown"}
                cityConnection={session.ip || "unknown"}
                browser={session.browser || "unknown"}
              />
            ))
          )}
        </div>
      </Paper>
    </PageLayout>
  );
};

export default Devices;
