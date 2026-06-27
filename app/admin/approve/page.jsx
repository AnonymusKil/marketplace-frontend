"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { APPROVE_SELLER, sellerDataAdmin } from "@/src/graphql/mutations/store";
import StoreInfo from "@/components/admin/StoreInfo";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function AdminApprove() {
  const [approveSeller] = useMutation(APPROVE_SELLER);

  const { data, loading, error, refetch } = useQuery(sellerDataAdmin, {
    variables: {
      status: "pending",
    },
  });

  const handleApproveSeller = async ({ storeId, status }) => {
    try {
      const { data } = await approveSeller({
        variables: {
          sellerId: storeId,
          sellerStatus: status,
        },
      });

      toast.success(`Seller ${status}`);
      console.log("Approve/reject response:", data);

      // 🔥 refresh list after action
      refetch();
    } catch (err) {
      console.log("Error approving/rejecting seller:", err);
      toast.error("Failed to update store status");
    }
  };

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="text-red-500">
        Failed to load sellers
      </div>
    );

  const stores = data?.sellers || [];

  return (
    <div className="text-slate-500 mb-28">
      <h1 className="text-2xl">
        Approve <span className="text-slate-800 font-medium">Stores</span>
      </h1>

      {stores.length ? (
        <div className="flex flex-col gap-4 mt-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white border rounded-lg shadow-sm p-6 flex max-md:flex-col gap-4 md:items-end max-w-4xl"
            >
              {/* Store Info */}
              <StoreInfo store={store} />

              {/* Actions */}
              <div className="flex gap-3 pt-2 flex-wrap">
                <button
                  onClick={() =>
                    handleApproveSeller({
                      storeId: store.id,
                      status: "approved",
                    })
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleApproveSeller({
                      storeId: store.id,
                      status: "rejected",
                    })
                  }
                  className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-80">
          <h1 className="text-3xl text-slate-400 font-medium">
            No Application Pending
          </h1>
        </div>
      )}
    </div>
  );
}