import BinanceIcon from "@/public/icons/BinanceIcon";
import BtcIcon from "@/public/icons/BtcIcon";
import EtcIcon from "@/public/icons/EtcIcon";
import SolIcon from "@/public/icons/SolIcon";
import TetherIcon from "@/public/icons/TetherIcon";

export const cryptoAssets = [
  {
    title: "BTC",
    price: "200,000",
    progress: 35,
    icon: <BtcIcon className="text-foreground" />,
  },
  {
    title: "BNB",
    price: "320",
    progress: 25,
    icon: <BinanceIcon className="text-foreground" />,
  },
  {
    title: "SOL",
    price: "180",
    progress: 10,
    icon: <SolIcon className="text-foreground" />,
  },
  {
    title: "USDT",
    price: "1.00",
    progress: 15,
    icon: <TetherIcon className="text-foreground" />,
  },
  {
    title: "ETC",
    price: "25",
    progress: 5,
    icon: <EtcIcon className="text-foreground" />,
  },
];
