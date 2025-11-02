"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import CpgCard from "@/components/UI/cpg-card";
import Modal from "@/components/UI/modal";
import VerifyInput from "@/components/UI/verify-input";
import axios from "@/config/axios.config";
import SearchIcon from "@/public/icons/SearchIcon";
import { GetCpgLinksResponse } from "@/types/auth";
import ReactQueryKey from "@/types/react_query_key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Cpg = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<{
    id: string;
    linkId: string;
  } | null>(null);

  const { data: cpgData, isLoading } = useQuery({
    queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletCpgLinks],
    queryFn: async () => {
      const response = await axios.get<GetCpgLinksResponse>("/wallet/cpg");
      return response.data;
    },
    refetchOnWindowFocus: false,
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
      toast.success("Payment link deleted successfully");
      setDeleteModalOpen(false);
      setLinkToDelete(null);
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.wallet, ReactQueryKey.walletCpgLinks],
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to delete payment link";
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
      <PageLayout title="CPG">
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push("/wallet/link-cpg")}
            className="w-full mt-5"
            size="md"
          >
            Create payment link
          </Button>
          <VerifyInput
            icon={<SearchIcon />}
            inputSize="sm"
            placeholder="Payment link ID , Order ID"
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
    <PageLayout title="CPG">
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => router.push("/wallet/link-cpg")}
          className="w-full mt-5"
          size="md"
        >
          Create payment link
        </Button>
        <VerifyInput
          icon={<SearchIcon />}
          inputSize="sm"
          placeholder="Payment link ID , Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {filteredLinks && filteredLinks.length > 0 ? (
          filteredLinks.map((link) => (
            <CpgCard
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
              ? "No payment links found matching your search"
              : "No payment links yet. Create your first payment link!"}
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        size="md"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Delete Payment Link</h3>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete this payment link? This action
            cannot be undone.
          </p>
          {linkToDelete && (
            <div className="bg-gray-100 p-3 rounded-lg mb-6">
              <p className="text-xs text-gray-500 mb-1">Link ID</p>
              <p className="text-sm font-mono text-gray-800 break-all">
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
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              size="md"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
};

export default Cpg;
