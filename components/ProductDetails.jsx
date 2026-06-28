"use client";
import {
  ADD_OR_UPDATE_CART_ITEM,
  GET_CART,
} from "../src/graphql/mutations/cart";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_BEST_COUPON } from "../src/graphql/mutations/coupon";
import {
  StarIcon,
  TagIcon,
  EarthIcon,
  CreditCardIcon,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import Loading from "./Loading";
import toast from "react-hot-toast";

const ProductDetails = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images?.[0] || "");
  const [adding, setAdding] = useState(false);
  const { data, loading } = useQuery(GET_BEST_COUPON);
  const coupon = data?.getBestCoupon;
  const { data: cartData, loading: cartLoading } = useQuery(GET_CART);
  const cartItems = cartData?.getCart?.items || [];
  const productId = product.id;
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const [addOrUpdateCartItem] = useMutation(ADD_OR_UPDATE_CART_ITEM, {
    refetchQueries: [GET_CART],
  });
  const handleAddOrUpdateCartItem = async ({ productId, quantity }) => {
    try {
      setAdding(true);
      toast.loading("Adding...", {
        id: "cart",
      });
      const { data } = await addOrUpdateCartItem({
        variables: {
          input: {
            productId,
            quantity,
          },
        },
      });
      toast.success("Added to cart", { id: "cart" });
    } catch (error) {
      toast.error(error?.message || "Failed to add item", { id: "cart" });
    } finally {
      setAdding(false);
    }
  };
  const cartItem = cartItems.find((item) => item.product.id === productId);
  const discountAmount =
    coupon?.discountType === "percentage"
      ? (product.price * coupon.discountValue) / 100
      : coupon?.discountValue || 0;

  const finalPrice = Math.max(product.price - discountAmount, 0);
  const router = useRouter();
  if (cartLoading) return <Loading />;
  return (
    <div className="flex max-lg:flex-col gap-12">
      <div className="flex max-sm:flex-col-reverse gap-3">
        <div className="flex sm:flex-col gap-3">
          {product.images?.map((image, index) => (
            <div
              key={index}
              onClick={() => setMainImage(product.images[index])}
              className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer"
            >
              <Image
                src={image}
                className="group-hover:scale-103 group-active:scale-95 transition"
                alt=""
                width={45}
                height={45}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg ">
          <Image src={mainImage} alt="" width={250} height={250} />
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-slate-800">
          {product.name}
        </h1>
        <div className="flex items-center mt-2">
          {/* {Array(5).fill('').map((_, index) => (
                        <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                    ))} */}

          {Array(5)
            .fill("")
            .map((_, index) => (
              <StarIcon
                key={index}
                size={14}
                className="text-transparent mt-0.5"
                fill="#00C950"
              />
            ))}
          <p className="text-sm ml-3 text-slate-500">
            {/* {product.rating.length} Reviews */}
          </p>
        </div>
        <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
          {coupon ? (
            <>
              <p className="line-through">
                {currency}
                {product.price}
              </p>

              <p>
                {currency}
                {finalPrice}
              </p>
            </>
          ) : (
            <p>
              {currency}
              {product.price}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <TagIcon size={14} />

          {coupon ? (
            <span className="bg-green-50 text-green-700 px-3 py-2 rounded-lg font-medium">
              {coupon.discountType === "percentage"
                ? `${coupon.discountValue}% OFF today`
                : `${currency}${coupon.discountValue} OFF today`}
            </span>
          ) : (
            <span className="text-slate-400">No active deals</span>
          )}
        </div>
        <div className="flex items-end gap-5 mt-10">
          {cartItem && (
            <div className="flex flex-col gap-3">
              <p className="text-lg text-slate-800 font-semibold">Quantity</p>
              <Counter
                productId={productId}
                quantity={cartItem?.quantity || 1}
              />{" "}
            </div>
          )}
          <button
            disabled={adding}
            onClick={() =>
              !cartItem
                ? handleAddOrUpdateCartItem({ productId, quantity: 1 })
                : router.push("/cart")
            }
            className="bg-slate-800 text-white px-10 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition"
          >
            {adding ? "Adding..." : cartItem ? "View Cart" : "Add To Cart"}{" "}
          </button>
        </div>
        <hr className="border-gray-300 my-5" />
        <div className="flex flex-col gap-4 text-slate-500">
          <p className="flex gap-3">
            {" "}
            <EarthIcon className="text-slate-400" /> Free shipping
            worldwide{" "}
          </p>
          <p className="flex gap-3">
            {" "}
            <CreditCardIcon className="text-slate-400" /> 100% Secured
            Payment{" "}
          </p>
          <p className="flex gap-3">
            {" "}
            <UserIcon className="text-slate-400" /> Trusted by top brands{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
