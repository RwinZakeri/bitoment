import PageLayout from "@/components/layout/page/pageLayout";
import Link from "next/link";

const Home = () => {
  return (
    <PageLayout title="Home">
      <Link href={"/welcome"}>welcome</Link>
    </PageLayout>
  );
};

export default Home;
