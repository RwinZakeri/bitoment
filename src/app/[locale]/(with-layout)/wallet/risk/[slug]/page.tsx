import RiskRepostSingle from "@/components/pages/dashboard/wallet/riskReport/riskReportSingle/riskReportSingle";

interface RiskRepotSinglePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const RiskRepotSinglePage = async ({ params }: RiskRepotSinglePageProps) => {
  const { slug } = await params;
  const id = Number(slug);
  return <RiskRepostSingle id={id} />;
};

export default RiskRepotSinglePage;

