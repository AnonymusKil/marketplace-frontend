"use client";
import { getSellerFrontsWithProducts } from "../../../../src/graphql/mutations/store";
import { useQuery } from "@apollo/client/react";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MailIcon, MapPinIcon } from "lucide-react";
import Loading from "@/components/Loading";
import Image from "next/image";
import { dummyStoreData, productDummyData } from "@/assets/assets";

export default function StoreShop() {
  const { username } = useParams();

  const { data,loading } = useQuery(getSellerFrontsWithProducts, {
    variables: {
      storeName: username,
    },
  });
  const store = data?.getSellerDetailsWithProducts?.seller;
  const products = data?.getSellerDetailsWithProducts?.products || [];

  if(loading) return <Loading/>

  return  (
    <div className="min-h-[70vh] mx-6">
      <div className="max-w-7xl mx-auto bg-slate-50 rounded-xl p-6 md:p-10 mt-6 flex flex-col md:flex-row items-center gap-6 shadow-xs">
        <Image
          src={store?.businessLogo}
          alt={store?.storeName}
          className="size-32 sm:size-38 object-cover border-2 border-slate-100 rounded-md"
          width={200}
          height={200}
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-semibold text-slate-800">
            {store?.storeName}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-lg">
            {store?.description}
          </p>
          <div className="text-xs text-slate-500 mt-4 space-y-1"></div>
          <div className="space-y-2 text-sm text-slate-500">
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 text-gray-500 mr-2" />
              <span>{store?.businessAddress}</span>
            </div>
            <div className="flex items-center">
              <MailIcon className="w-4 h-4 text-gray-500 mr-2" />
              <span>{store?.businessEmail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className=" max-w-7xl mx-auto mb-40">
        <h1 className="text-2xl mt-12">
          Shop <span className="text-slate-800 font-medium">Products</span>
        </h1>
        <div className="mt-5 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  ) 
}
