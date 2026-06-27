"use client";

import { GET_PRODUCT_BY_ID } from "../../../../src/graphql/mutations/product";
import { useQuery } from "@apollo/client/react";
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import Loading from "../../../../components/Loading";
export default function Product() {
  const { productId } = useParams();
  const { data, loading } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      productId,
    },
  });
  const product = data?.getProductsByProductId;
  if (loading) return <Loading />;

  return (
    <div className="mx-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrums */}
        <div className="  text-gray-600 text-sm mt-8 mb-5">
          Home / Products / {product?.category}
        </div>

        {/* Product Details */}
        {product && <ProductDetails product={product} />}

        {/* Description & Reviews */}
        {product && <ProductDescription product={product} />}
      </div>
    </div>
  );
}
