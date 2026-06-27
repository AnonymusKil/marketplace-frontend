"use client";
import React from "react";
import toast from "react-hot-toast";
import { GET_BEST_COUPON } from "../src/graphql/mutations/coupon";
import { useQuery } from "@apollo/client/react";

export default function Banner() {
  const { data, loading } = useQuery(GET_BEST_COUPON);
  const coupon = data?.getBestCoupon;

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const [isOpen, setIsOpen] = React.useState(true);

  if (loading || !coupon || !isOpen) return null;

  const formatDiscount =
    coupon.discountType === "percentage"
      ? `${coupon.discountValue}%`
      : `${currency}${coupon.discountValue}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.couponCode);
      toast.success("Coupon copied!");
    } catch (err) {
      toast.error("Copy failed");
    }
  };

  const handleClaim = async () => {
    await handleCopy();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
return (
  <div className="w-full px-4 sm:px-6 py-2 font-medium text-sm text-white text-center bg-linear-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 max-w-7xl mx-auto">

      <p className="text-xs sm:text-sm leading-snug">
        Get {formatDiscount} OFF on your first order 🎉
      </p>

      {/* Actions */}
      <div className="flex items-center justify-center sm:justify-end gap-3">

        <button
          onClick={handleClaim}
          className="text-xs sm:text-sm font-normal text-gray-800 bg-white px-4 sm:px-6 py-1.5 rounded-full hover:scale-105 transition"
        >
          Claim
        </button>

        <button
          onClick={handleClose}
          className="text-white text-lg sm:text-base hover:opacity-70 transition"
        >
          ✕
        </button>

      </div>

    </div>
  </div>
);
}