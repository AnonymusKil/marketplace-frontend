"use client";
import { dummyStoreDashboardData } from "@/assets/assets";
import { useQuery } from "@apollo/client/react";
import { SELLERORDERSTATS } from "@/src/graphql/mutations/sellerStats";
import { GET_SELLER_REVIEWS } from "@/src/graphql/mutations/reviews";
import Loading from "@/components/Loading";
import {
  CircleDollarSignIcon,
  ShoppingBasketIcon,
  StarIcon,
  TagsIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hook/useAuth";

export default function Dashboard() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const router = useRouter();
  const { data: statsData, loading: statsLoading } = useQuery(SELLERORDERSTATS);

  const { data: reviewsData, loading: reviewsLoading } =
    useQuery(GET_SELLER_REVIEWS);
  const stats = statsData?.sellerOrderStats || {
    totalEarnings: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalItemsSold: 0,
  };
  const reviews = reviewsData?.getSellerReviews || [];

    if (statsLoading) return <Loading />;
  if (reviewsLoading) return <Loading />;

  const dashboardCardsData = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: ShoppingBasketIcon,
    },
    {
      title: "Total Earnings",
      value: `${currency}${stats.totalEarnings.toLocaleString()}`,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: TagsIcon,
    },
    {
      title: "Total Items Sold",
      value: stats.totalItemsSold,
      icon: StarIcon,
    },
  ];

  return (
    <div className=" text-slate-500 mb-28">
      <h1 className="text-2xl">
        Seller <span className="text-slate-800 font-medium">Dashboard</span>
      </h1>

      <div className="flex flex-wrap gap-5 my-10 mt-4">
        {dashboardCardsData.map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-11 border border-slate-200 p-3 px-6 rounded-lg"
          >
            <div className="flex flex-col gap-3 text-xs">
              <p>{card.title}</p>
              <b className="text-2xl font-medium text-slate-700">
                {card.value}
              </b>
            </div>
            <card.icon
              size={50}
              className=" w-11 h-11 p-2.5 text-slate-400 bg-slate-100 rounded-full"
            />
          </div>
        ))}
      </div>

      <h2>Total Reviews</h2>

      <div className="mt-5">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex max-sm:flex-col gap-5 sm:items-center justify-between py-6 border-b border-slate-200 text-sm text-slate-600 max-w-4xl"
          >
            <div>
              <div className="flex gap-3">
                {review.user.image ? (
                  <Image
                    src={review.user.image}
                    alt=""
                    className="w-10 aspect-square rounded-full"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                    <UserIcon size={20} className="text-slate-500" />
                  </div>
                )}

                <div>
                  <p className="font-medium">{review.user.name}</p>
                  <p className="font-light text-slate-500">
                    {new Date(review.createdAt).toDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-slate-500 max-w-xs leading-6">
                {review.review}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-6 sm:items-end">
              <div className="flex flex-col sm:items-end">
                <p className="text-slate-400">{review.product?.category}</p>
                <p className="font-medium">{review.product?.name}</p>
                <div className="flex items-center">
                  {Array(5)
                    .fill("")
                    .map((_, index) => (
                      <StarIcon
                        key={index}
                        size={17}
                        className="text-transparent mt-0.5"
                        fill={
                          review.rating >= index + 1 ? "#00C950" : "#D1D5DB"
                        }
                      />
                    ))}
                </div>
              </div>
              <button
                onClick={() => router.push(`/product/${review.product.id}`)}
                className="bg-slate-100 px-5 py-2 hover:bg-slate-200 rounded transition-all"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
