"use client";
import React from "react";
import Title from "./Title";
import { GET_PRODUCTS } from "../src/graphql/mutations/product";
import { useQuery } from "@apollo/client/react";
import ProductCard from "./ProductCard";
import Loading from "./Loading";

const LatestProducts = () => {
  const displayQuantity = 4;
  const { data , loading} = useQuery(GET_PRODUCTS);
  const products = data?.products || [];
  if (loading) return <Loading/>

  return (
    <div className="px-6 my-30 max-w-6xl mx-auto">
      <Title
        title="Latest Products"
        description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`}
        href="/shop"
      />
      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between">
        {products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, displayQuantity)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default LatestProducts;
