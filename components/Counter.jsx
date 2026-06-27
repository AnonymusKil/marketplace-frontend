"use client";
import {
  ADD_OR_UPDATE_CART_ITEM,
  GET_CART,
  DELETE_CART_ITEM,
} from "@/src/graphql/mutations/cart";
import { useMutation, useQuery } from "@apollo/client/react";
const Counter = ({ productId, quantity }) => {
  const [addOrUpdateCartItem] = useMutation(ADD_OR_UPDATE_CART_ITEM);
  const [deleteCartItem] = useMutation(DELETE_CART_ITEM);
  const { data } = useQuery(GET_CART);
  const getCartData = data?.getCart;
  console.log("Cart Query:", data);
  const increaseQuantity = async () => {
    await addOrUpdateCartItem({
      variables: {
        input: {
          productId,
          quantity: 1,
        },
      },
      refetchQueries: [GET_CART],
    });
  };

  const decreaseQuantity = async () => {
    await deleteCartItem({
      variables: {
        input: {
          productId,
          deleteAll: false,
        },
      },
      refetchQueries: [GET_CART],
    });
  };

  return (
    <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600">
      <button onClick={decreaseQuantity} className="p-1 select-none">
        -
      </button>
      <p className="p-1">{quantity}</p>
      <button onClick={increaseQuantity} className="p-1 select-none">
        +
      </button>
    </div>
  );
};

export default Counter;
