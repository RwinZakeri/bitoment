import PageLayout from "@/components/layout/page/pageLayout";
import Paper from "@/components/UI/paper";

const AboutUsPage = () => {
  return (
    <PageLayout title="About Us">
      <Paper className="mt-6">
        <p className="text-lg ">
          At <span className="text-green-600 font-bold">Bittomint</span> , we
          are dedicated to providing a secure, transparent, and efficient
          platform for investors looking to explore the world of digital assets.
          We offer a range of investment opportunities through carefully curated
          Investment Funds that cater to both new and experienced investors. Our
          services extend beyond just investments, with a fully integrated Swap
          feature that allows users to seamlessly exchange different
          cryptocurrencies. Whether you’re looking to deposit or withdraw, our
          user-friendly system ensures that your funds are handled swiftly and
          securely. With a strong commitment to customer satisfaction, Bittomint
          provides a streamlined experience, backed by industry-leading security
          measures, so you can focus on growing your portfolio with peace of
          mind.
        </p>
      </Paper>
    </PageLayout>
  );
};

export default AboutUsPage;
