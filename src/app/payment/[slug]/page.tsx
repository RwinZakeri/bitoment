import PaymentSingle from "@/components/pages/cpg/CpgSingle";

const PaymentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <PaymentSingle id={slug} />;
};

export default PaymentPage;
