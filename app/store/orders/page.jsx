"use client";
import {
  UPDATE_SELLER_ORDERS,
  GET_SELLER_ORDERS,
} from "./../../../src/graphql/mutations/order";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

export default function StoreOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading, error } = useQuery(GET_SELLER_ORDERS);
  const [updateSeller] = useMutation(UPDATE_SELLER_ORDERS);

  const orders = data?.getSellerOrders || [];
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await updateSeller({
        variables: {
            orderId,
            status,
        },
      });
      console.log(data)
    } catch (error) {
      toast.error("Checkout Failed");
      return null;
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="text-2xl text-slate-500 mb-5">
        Store <span className="text-slate-800 font-medium">Orders</span>
      </h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="overflow-x-auto max-w-4xl rounded-md shadow border border-gray-200">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wider">
              <tr>
                {[
                  "Sr. No.",
                  "Customer",
                  "Total",
                  "Payment",
                  "Coupon",
                  "Status",
                  "Date",
                ].map((heading, i) => (
                  <th key={i} className="px-4 py-3">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => openModal(order)}
                >
                  <td className="pl-6 text-green-600">{index + 1}</td>
                  <td className="px-4 py-3">{order.user?.name}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {currency}
                    {order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{order.payment?.method}</td>
                  <td className="px-4 py-3">
                    {/* {order.isCouponUsed ? (
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                                {order.coupon?.code}
                                            </span>
                                        ) : (
                                            "—"
                                        )} */}
                    {order?.couponCode}
                  </td>
                  <td
                    className="px-4 py-3"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className="border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-200"
                    >
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(order.createdAt).toISOString().toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black/50 text-slate-700 text-sm backdrop-blur-xs z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4 text-center">
              Order Details
            </h2>

            {/* Customer Details */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Customer Details</h3>
              <p>
                <span className="text-green-700">Name:</span>{" "}
                {selectedOrder.user?.name}
              </p>
              <p>
                <span className="text-green-700">Email:</span>{" "}
                {selectedOrder.user?.email}
              </p>
              <p>
                <span className="text-green-700">Phone:</span>{" "}
                {selectedOrder.shippingAddress?.phoneNumber || "N/A"}
              </p>
              <p>
                <span className="text-green-700">Address:</span>{" "}
                {`${selectedOrder.shippingAddress?.street}, ${selectedOrder.shippingAddress?.city}, ${selectedOrder.shippingAddress?.state}, ${selectedOrder.shippingAddress?.zipCode}, ${selectedOrder.shippingAddress?.country}`}
              </p>
            </div>

            {/* Products */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Products</h3>
              <div className="space-y-2">
                {selectedOrder.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border border-slate-100 shadow rounded p-2"
                  >
                    <img
                      src={
                        item.product.images[0] || item.product.images?.[0]
                      }
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-slate-800">{item.product?.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: {currency}{item.product?.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Status */}
            <div className="mb-4">
              <p>
                <span className="text-green-700">Payment Method:</span>{" "}
                {selectedOrder.payment.method}
              </p>
              <p>
                <span className="text-green-700">Paid:</span>{" "}
                {selectedOrder.paymentStatus ? "Yes" : "No"}
              </p>
              {selectedOrder.isCouponUsed && (
                <p>
                  <span className="text-green-700">Coupon:</span>{" "}
                  {selectedOrder.couponCode} ({selectedOrder.coupon.discount}%
                  off)
                </p>
              )}
              <p>
                <span className="text-green-700">Status:</span>{" "}
                {selectedOrder.orderStatus}
              </p>
              <p>
                <span className="text-green-700">Order Date:</span>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-slate-200 rounded hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
