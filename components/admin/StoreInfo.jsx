"use client";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { sellerDataAdmin } from "@/src/graphql/mutations/store";

const StoreInfo = () => {
  const { data, loading, error } = useQuery(sellerDataAdmin, {
    variables: {
      status: "pending",
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-700 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error loading store data</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {data?.sellers?.map((store) => (
        <div key={store.id} className="flex-1 space-y-2 text-sm border p-4 rounded-lg">

          {/* Logo + Name */}
          <Image
            width={100}
            height={100}
            src={store.businessLogo}
            alt={store.storeName}
            className="max-w-20 max-h-20 object-contain shadow rounded-full max-sm:mx-auto"
          />

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <h3 className="text-xl font-semibold text-slate-800">
              {store.storeName}
            </h3>

            <span className="text-sm">@{store.user?.name}</span>

            {/* Status Badge */}
            <span
              className={`text-xs font-semibold px-4 py-1 rounded-full ${
                store.user?.sellerStatus === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : store.sellerStatus === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {store.user?.sellerStatus}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 my-5 max-w-2xl">
            {store.description}
          </p>

          {/* Contact Info */}
          <p className="flex items-center gap-2">
            <MapPin size={16} /> {store.businessAddress}
          </p>

          <p className="flex items-center gap-2">
            <Phone size={16} /> {store.businessPhone}
          </p>

          <p className="flex items-center gap-2">
            <Mail size={16} /> {store.businessEmail}
          </p>

          {/* Created info */}
          <p className="text-slate-700 mt-5">
            Applied on{" "}
            <span className="text-xs">
              {new Date(store.user?.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </p>

          {/* Owner */}
          <div className="flex items-center gap-2 text-sm">
            <Image
              width={36}
              height={36}
              src={store.owner?.image || "/avatar.png"}
              alt={store.user?.name || "user"}
              className="w-9 h-9 rounded-full"
            />
            <div>
              <p className="text-slate-600 font-medium">
                {store.user?.name}
              </p>
              <p className="text-slate-400">
                {store.user?.email}
              </p>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default StoreInfo;