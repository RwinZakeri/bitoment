import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import CurrencyProgressCard from "@/components/UI/currency-progress-card";
import Paper from "@/components/UI/paper";
import AddIcon from "@/public/icons/AddIcon";
import BinanceIcon from "@/public/icons/BinanceIcon";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";

const AssetDistributionPage = () => {
  // Crypto assets data
  const cryptoAssets = [
    {
      title: "BTC",
      price: "200,000",
      progress: 35,
      icon: <BtcIcon className="w-8 h-8" />,
    },
    {
      title: "BNB",
      price: "320",
      progress: 25,
      icon: <BinanceIcon className="w-8 h-8" />,
    },
    {
      title: "SOL",
      price: "180",
      progress: 20,
      icon: <SolIcon className="w-8 h-8" />,
    },
    {
      title: "USDT",
      price: "1.00",
      progress: 15,
      icon: <TetherIcon className="w-8 h-8" />,
    },
    {
      title: "ETC",
      price: "25",
      progress: 5,
      icon: <EtcIcon className="w-8 h-8" />,
    },
  ];

  return (
    <PageLayout title="Asset Distribution" className="px-5">
      <Paper className="rounded-xl bg-white mt-4 p-4">
        <div className="flex justify-between items-center">
          <div>
            <p>
              {" "}
              <span className="text-3xl">638,532.21</span>{" "}
              <span className="text-gray-700/60 text-xl">USDT</span>{" "}
            </p>
            <p className="mt-2 text-gray-800/65">Total balance</p>
          </div>
          <Button
            size="sm"
            icon={<AddIcon />}
            className="p-0 px-2 rounded-sm"
            style={{ backgroundColor: "#11BAAA" }}
          >
            Add
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {cryptoAssets.map((asset, index) => (
            <CurrencyProgressCard
              key={index}
              title={asset.title}
              price={asset.price}
              progress={asset.progress}
              icon={asset.icon}
            />
          ))}
        </div>
      </Paper>
    </PageLayout>
  );
};

export default AssetDistributionPage;
