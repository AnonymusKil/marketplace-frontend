"use client";
import { UserIcon } from "lucide-react";
import { GET_REVIEW } from "../src/graphql/mutations/reviews";
import { useMutation, useQuery } from "@apollo/client/react";
import { ArrowRight, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Loading from "./Loading";
const ProductDescription = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState("Description");
  const { data, loading } = useQuery(GET_REVIEW, {
    variables: {
      productId: product.id,
    },
  });
  if (loading) return <Loading />;
  const reviews = data?.getProductReviews || [];

  return (
    <div className="my-18 text-sm text-slate-600">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
        {["Description", "Reviews"].map((tab, index) => (
          <button
            className={`${tab === selectedTab ? "border-b-[1.5px] font-semibold" : "text-slate-400"} px-3 py-2 font-medium`}
            key={index}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Description */}
      {selectedTab === "Description" && (
        <p className="max-w-xl">{product.description}</p>
      )}

      {/* Reviews */}
      {selectedTab === "Reviews" && (
        <div className="flex flex-col gap-3 mt-14">
          {reviews.length > 0 ? (
            reviews.map((item, index) => (
              <div key={index} className="flex gap-5 mb-10">
                <UserIcon size={100} className="text-slate-500" />

                <div>
                  <div className="flex items-center">
                    {Array(5)
                      .fill("")
                      .map((_, index) => (
                        <StarIcon
                          key={index}
                          size={18}
                          className="text-transparent mt-0.5"
                          fill={
                            item.rating >= index + 1 ? "#00C950" : "#D1D5DB"
                          }
                        />
                      ))}
                  </div>

                  <p className="text-sm max-w-lg my-4">{item?.content}</p>

                  <p className="font-medium text-slate-800">
                    {item?.user?.name || "Anonymous User"}
                  </p>

                  <p className="mt-3 font-light">
                    {new Date(item.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 flex items-center justify-center text-slate-400">
              <h1 className="text-xl sm:text-2xl font-semibold">
                No reviews yet for this product
              </h1>
            </div>
          )}
        </div>
      )}

      {/* Store Page */}
      <div className="flex gap-3 mt-14">
        <Image
          src={product.seller.businessLogo}
          alt=""
          className="size-11 rounded-full ring ring-slate-400"
          width={100}
          height={100}
        />
        <div>
          <p className="font-medium text-slate-600">
            Product by {product.seller.storeName}
          </p>
          <Link
            href={`/shop/${product.seller.storeName}`}
            className="flex items-center gap-1.5 text-green-500"
          >
            {" "}
            view store <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
