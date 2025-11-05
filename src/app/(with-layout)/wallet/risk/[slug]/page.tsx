import RiskRepostSingle from "@/components/pages/dashboard/wallet/riskReport/riskReportSingle/riskReportSingle";

interface RiskRepotSinglePageProps {
  params: {
    slug: string;
  };
}

const RiskRepotSinglePage = async ({ params }: RiskRepotSinglePageProps) => {
  const id = Number(params.slug);
  return <RiskRepostSingle id={id} />;
};

export default RiskRepotSinglePage;
