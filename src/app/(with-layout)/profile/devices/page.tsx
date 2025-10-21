import PageLayout from "@/components/layout/page/pageLayout";
import DeviceCard from "@/components/UI/deviceCard";

const DevicesPage = () => {
  return (
    <PageLayout title="Devices">
      <div className="pt-4 flex flex-col gap-11">
        <DeviceCard
          title={"Apple Mac"}
          deviceName={"macOS 10.15 Catalina"}
          cityConnection={"Connected to Britain"}
          label={"My Devices"}
        />
        <DeviceCard
          isDevice={false}
          title={"Apple Mac"}
          deviceName={"macOS 10.15 Catalina"}
          cityConnection={"Connected to Britain"}
          label={"Other Devices"}
        />
      </div>
    </PageLayout>
  );
};

export default DevicesPage;
