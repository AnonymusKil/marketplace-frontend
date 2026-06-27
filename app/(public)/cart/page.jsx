"use client";
import {
  ADD_OR_UPDATE_CART_ITEM,
  GET_CART,
  DELETE_CART_ITEM,
} from "../../../src/graphql/mutations/cart";
import { useMutation, useQuery } from "@apollo/client/react";
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";


export default function Cart() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const { data } = useQuery(GET_CART);
  const [addOrUpdateCartItem] = useMutation(ADD_OR_UPDATE_CART_ITEM, {
    refetchQueries: [GET_CART],
  });
  const [deleteCartItem] = useMutation(DELETE_CART_ITEM, {
    refetchQueries: [GET_CART],
  });
  const getCartData = data?.getCart;
  const cartItems = getCartData?.items || [];
  const totalPrice = getCartData?.totalPrice || 0;
  const handleAddOrUpdateCartItem = async ({ productId, quantity }) => {
    try {
      const { data } = await addOrUpdateCartItem({
        variables: {
          input: {
            productId,
            quantity,
          },
        },
      });

      console.log("Add to cart response", data);
    } catch (error) {
      console.error("addToCartError:", error);
    }
  };
  const handleDeleteCartItem = async ({ productId, deleteAll }) => {
    try {
      const { data } = await deleteCartItem({
        variables: {
          input: {
            productId,
            deleteAll,
          },
        },
      });
      console.log("Delete Cart Response", data);
    } catch (error) {
      console.error("delete Cart Error:", error);
    }
  };

  return cartItems.length > 0 ? (
    <div className="min-h-screen mx-6 text-slate-800">
      <div className="max-w-7xl mx-auto ">
        {/* Title */}
        <PageTitle
          heading="My Cart"
          text="items in your cart"
          linkText="Add more"
        />

        <div className="flex items-start justify-between gap-5 max-lg:flex-col">
          <table className="w-full max-w-4xl text-slate-600 table-auto">
            <thead>
              <tr className="max-sm:text-sm">
                <th className="text-left">Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th className="max-md:hidden">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="space-x-2">
                  <td className="flex gap-3 my-4">
                    <div className="flex gap-3 items-center justify-center bg-slate-100 size-18 rounded-md">
                      <Image
                        src={item.product.images[0]}
                        className="h-14 w-auto"
                        alt=""
                        width={45}
                        height={45}
                      />
                    </div>
                    <div>
                      <p className="max-sm:text-sm">{item.product.name}</p>
                      <p className="text-xs text-slate-500">{item.product.category}</p>
                      <p>
                        {currency}
                        {item.priceAtAdd.toLocaleString()}
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <Counter
                      productId={item.product.id}
                      quantity={item.quantity}
                    />
                  </td>
                  <td className="text-center">
                    {currency}
                    {(item.priceAtAdd * item.quantity).toLocaleString()}
                  </td>
                  <td className="text-center max-md:hidden">
                    <button
                      onClick={() => handleDeleteCartItem({productId:item.product.id, deleteAll:true})}
                      className=" text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <OrderSummary totalPrice={totalPrice} items={cartItems} />
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
      <h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
    </div>
  );
}
