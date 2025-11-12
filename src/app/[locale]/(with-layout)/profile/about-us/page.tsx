"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Paper from "@/components/UI/paper";
import { useTranslations } from "next-intl";

const AboutUsPage = () => {
  const t = useTranslations();
  return (
    <PageLayout title={t("aboutUs.title")}>
      <Paper className="mt-6 bg-white p-6">
        <p className="text-lg ">
          {t("aboutUs.description")}
        </p>
      </Paper>
    </PageLayout>
  );
};

export default AboutUsPage;

