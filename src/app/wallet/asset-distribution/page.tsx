import PageLayout from "@/components/layout/page/pageLayout";
import TotalPrice from "@/components/module/total-price";
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
      icon: <BtcIcon className="" />,
    },
    {
      title: "BNB",
      price: "320",
      progress: 25,
      icon: <BinanceIcon className="" />,
    },
    {
      title: "SOL",
      price: "180",
      progress: 10,
      icon: <SolIcon className="" />,
    },
    {
      title: "USDT",
      price: "1.00",
      progress: 15,
      icon: <TetherIcon className="" />,
    },
    {
      title: "ETC",
      price: "25",
      progress: 5,
      icon: <EtcIcon className="" />,
    },
  ];

  return (
    <PageLayout title="Asset Distribution" className="px-5">
      <Paper className="rounded-xl bg-white mt-4 p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <TotalPrice
            className="flex-col"
            button={
              <Button
                size="sm"
                icon={<AddIcon />}
                className="p-0 px-2 rounded-sm"
              >
                Add
              </Button>
            }
            totalPrice="638,532.21"
          />
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
