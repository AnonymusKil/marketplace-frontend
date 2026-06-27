"use client";
import Title from "./Title";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { BEST_SELLING_PRODUCTS } from "../src/graphql/mutations/sellerStats";
import { useQuery } from "@apollo/client/react";
import Loading from "./Loading";
const BestSelling = () => {
  const products = useSelector((state) => state.product.list);
  const displayQuantity = 8;

  const { data,loading } = useQuery(BEST_SELLING_PRODUCTS, {
    variables: {
     limit: displayQuantity,
    },
  });
  const bestSeller = data?.getBestSellingProducts || []
  if (loading) return <Loading/>
  return (
    <div className="px-6 my-30 max-w-6xl mx-auto">
      <Title
        title="Best Selling"
        description={`Showing ${bestSeller.length < displayQuantity ? bestSeller.length : displayQuantity} of ${bestSeller.length} products`}
        href="/shop"
      />
      <div className="mt-12  grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12">
        {bestSeller
          .map((item) => (
            <ProductCard key={item.product.id} product={item.product} />
          ))}
      </div>
    </div>
  );
};

export default BestSelling;
