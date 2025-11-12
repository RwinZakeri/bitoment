"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import CpgCard from "@/components/UI/cpg-card";
import Modal from "@/components/UI/modal";
import VerifyInput from "@/components/UI/verify-input";
import axios from "@/config/axios.config";
import { useCurrency } from "@/context/currencyContext";
import CopyRightIcon from "@/public/icons/CopyRightIcon";
import SearchIcon from "@/public/icons/SearchIcon";
import { CpgLink, GetCpgLinksResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/i18n/routing";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const Cpg = () => {
  const t = useTranslations();
  const { currency } = useCurrency();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const [linkToDelete, setLinkToDelete] = useState<{
    id: string;
    linkId: string;
  } | null>(null);

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success(t("wallet.addressCopied"));
    } catch (error) {
      console.error("Failed to copy address:", error);
      toast.error(t("wallet.failedToCopyAddress"));
    }
  };

  const [share, setShare] = useState<CpgLink | undefined>(undefined);
  const [qrCodeValue, setQrCodeValue] = useState<string>("");

  useEffect(() => {
    if (share?.link_id) {
      const generateRandomAddress = () => {
        const chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let address = "";
        const length = Math.floor(Math.random() * 10) + 26;
        for (let i = 0; i < length; i++) {
          address += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return address;
      };
      setQrCodeValue(generateRandomAddress());
    }
  }, [share?.link_id]);

  const { data: cpgData, isLoading } = useQuery({
    queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletCpgLinks],
    queryFn: async () => {
      const response = await axios.get<GetCpgLinksResponse>("/wallet/cpg");
      return response.data;
    },
    refetchOnWindowFocus: true,
    gcTime: 0,
    staleTime: 0,
  });
  const { mutate: deleteLink, isPending: isDeleting } = useMutation({
    mutationFn: async (linkId: string) => {
      const response = await axios.delete(`/wallet/cpg?link_id=${linkId}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success(t("wallet.paymentLinkDeleted"));
      setDeleteModalOpen(false);
      setLinkToDelete(null);
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletCpgLinks],
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || t("wallet.failedToDeletePaymentLink");
      toast.error(errorMessage);
    },
  });
  const handleDeleteClick = (linkId: string, id: string) => {
    setLinkToDelete({ id, linkId });
    setDeleteModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (linkToDelete) {
      deleteLink(linkToDelete.linkId);
    }
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setLinkToDelete(null);
  };

  const getStatusDisplay = (status?: string) => {
    switch (status) {
      case "active":
        return { text: t("wallet.active"), color: "text-blue-500" };
      case "inactive":
        return { text: t("wallet.inactive"), color: "text-gray-500" };
      case "completed":
        return { text: t("wallet.completed"), color: "text-emerald-500" };
      case "expired":
        return { text: t("wallet.expired"), color: "text-red-500" };
      case "wait":
        return { text: t("wallet.waiting"), color: "text-amber-500" };
      case "success":
        return { text: t("wallet.success"), color: "text-emerald-500" };
      default:
        return { text: status || "-", color: "text-gray-500" };
    }
  };

  const filteredLinks = cpgData?.links?.filter((link) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      link.link_id.toLowerCase().includes(query) ||
      link.order_id?.toLowerCase().includes(query) ||
      false
    );
  });

  if (isLoading) {
    return (
      <PageLayout title={t("wallet.cpg")}>
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push("/wallet/link-cpg")}
            className="w-full mt-5"
            size="md"
          >
            {t("wallet.createPaymentLink")}
          </Button>
          <VerifyInput
            icon={<SearchIcon />}
            inputSize="sm"
            placeholder={t("wallet.paymentLinkIdPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <div className="bg-white p-4 rounded-xl animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={t("wallet.cpg")}>
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => router.push("/wallet/link-cpg")}
          className="w-full mt-5"
          size="md"
        >
          {t("wallet.createPaymentLink")}
        </Button>
        <VerifyInput
          icon={<SearchIcon />}
          inputSize="sm"
          placeholder={t("wallet.paymentLinkIdPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {filteredLinks && filteredLinks.length > 0 ? (
          filteredLinks.map((link) => (
            <CpgCard
              shareHandler={() => {
                setOpenShareModal(true);
                setShare({ ...link });
              }}
              key={link.id}
              id={link.link_id}
              orderId={link.order_id}
              price={`${link.price} ${link.currency}`}
              currency={link.currency}
              url={link.url}
              status={link.status}
              onDelete={handleDeleteClick}
            />
          ))
        ) : (
          <div className="bg-white p-4 rounded-xl text-center text-gray-500">
            {searchQuery
              ? t("wallet.noPaymentLinksFound")
              : t("wallet.noPaymentLinksYet")}
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        size="md"
        modalPadding={32}
        className="rounded-lg"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">{t("wallet.deletePaymentLink")}</h3>
          <p className="text-sm text-gray-600 mb-6">
            {t("wallet.deletePaymentLinkConfirm")}
          </p>
          {linkToDelete && (
            <div className="bg-gray-100 p-3 rounded-lg mb-6">
              <p className="text-xs text-gray-500 mb-1">{t("wallet.linkId")}</p>
              <p className="text-sm font-mono text-foreground break-all">
                {linkToDelete.linkId}
              </p>
            </div>
          )}
          <div className="flex gap-3">
            <Button
              onClick={handleCloseDeleteModal}
              className="flex-1"
              variant="secondary"
              size="md"
              disabled={isDeleting}
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              size="md"
              disabled={isDeleting}
            >
              {isDeleting ? t("wallet.deleting") : t("wallet.delete")}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        className="rounded-lg"
        isOpen={openShareModal}
        onClose={() => setOpenShareModal(false)}
      >
        <div className="bg-white p-4 rounded-xl font-semibold">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center justify-center gap-2 w-full text-center">
                <p className="text-base">{t("wallet.order")} : #{share?.order_id}</p>
              </div>
            </div>
            <div className="pb-3 flex gap-2 justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p className="text-xs">{t("wallet.price")} :</p>
                  <p className="text-xs">
                    {share?.price ? Number(share.price).toFixed(1) : "0.0"}{" "}
                    {share?.currency || currency}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xs">{t("wallet.amount")} :</p>
                  <p className="text-xs">
                    {share?.price ? Number(share.price).toFixed(1) : "0.0"}{" "}
                    {share?.currency || currency}
                  </p>
                  <span className="px-1 bg-[#BE0000] text-xs text-white rounded-sm">
                    TRX
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-xs">{t("wallet.address")} :</p>
                  <div className="flex items-center gap-2 flex-1">
                    <p className="text-xs break-all">{share?.link_id}</p>
                    {share?.url && (
                      <button
                        onClick={() => handleCopyAddress(share?.link_id)}
                        className="cursor-pointer hover:opacity-70 transition-opacity shrink-0"
                        title={t("wallet.copyAddress")}
                      >
                        <CopyRightIcon width={16} height={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-fit">
                <div className="w-20 h-20 bg-white flex items-center justify-center">
                  {qrCodeValue ? (
                    <QRCodeSVG
                      value={qrCodeValue}
                      size={120}
                      level="M"
                      includeMargin={false}
                    />
                  ) : (
                    <div className="text-gray-400 text-xs">{t("wallet.generating")}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-col flex gap-3">
            <div className="w-11/12 mx-auto bg-gray-300 h-0.5"></div>

            <div className="flex gap-2">
              <p className="text-xs">{t("wallet.status")} :</p>
              <p className={`text-xs ${getStatusDisplay(share?.status).color}`}>
                {getStatusDisplay(share?.status).text}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs w-full shrink-0">
                {t("wallet.sharePaymentLink")}
              </p>
              <p className={`text-xs`}>
                {share?.url}
                {share?.url && (
                  <button
                    onClick={() => handleCopyAddress(share?.url)}
                    className="cursor-pointer hover:opacity-70 transition-opacity shrink-0"
                    title={t("wallet.copyAddress")}
                  >
                    <CopyRightIcon width={16} height={16} />
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
};

export default Cpg;
