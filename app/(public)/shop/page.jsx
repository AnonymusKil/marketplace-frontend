"use client";
import { Suspense } from "react";

import { GET_PRODUCTS } from "../../../src/graphql/mutations/product";
import { useQuery } from "@apollo/client/react";
import ProductCard from "@/components/ProductCard";
import { MoveLeftIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../../components/Loading"
function ShopContent() {
  // get query params ?search=abc
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  const { data, loading} = useQuery(GET_PRODUCTS, {
     variables: {
        search:search,
     },
  });
  const products = data?.products || [];
  if(loading) return <Loading/>


  return (
    <div className="min-h-[70vh] mx-6">
      <div className=" max-w-7xl mx-auto">
        <h1
          onClick={() => router.push("/shop")}
          className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer"
        >
          {" "}
          {search && <MoveLeftIcon size={20} />} All{" "}
          <span className="text-slate-700 font-medium">Products</span>
        </h1>
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
