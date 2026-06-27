"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { CREATE_COUPON_CODE, GET_COUPON } from "@/src/graphql/mutations/coupon";
import { useState } from "react";
import { format } from "date-fns";
import { DeleteIcon } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading"

export default function AdminCoupons() {
  const [createcCoupon] = useMutation(CREATE_COUPON_CODE);
  const { data, loading } = useQuery(GET_COUPON);
  if(loading) return <Loading/>
  const coupons = data?.getCoupons || [];
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    isActive: true,
    expiresAt: "",
    maxUses: "",
  });

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createcCoupon({
        variables: {
          input: {
            couponCode: newCoupon.code,
            couponDescription: newCoupon.description,
            discountType: newCoupon.discountType,
            discountValue: Number(newCoupon.discountValue),
            expiryDate: newCoupon.expiresAt,
            maxUses: Number(newCoupon.maxUses),
            isActive: newCoupon.isActive,
          },
        },
      });
      toast.success(
        data?.createCoupon?.message || "Coupon created successfully",
      );
      setNewCoupon({
        code: "",
        description: "",
        discountType: "percentage",
        discountValue: "",
        isActive: true,
        expiresAt: "",
        maxUses: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const deleteCoupon = async (code) => {
    // Logic to delete a coupon
  };

  return (
    <div className="text-slate-500 mb-40">
      {/* Add Coupon */}
      <form
        onSubmit={(e) =>
          toast.promise(handleAddCoupon(e), { loading: "Adding coupon..." })
        }
        className="max-w-sm text-sm"
      >
        <h2 className="text-2xl">
          Add <span className="text-slate-800 font-medium">Coupons</span>
        </h2>
        <div className="flex gap-2 max-sm:flex-col mt-2">
          <input
            type="text"
            placeholder="Coupon Code"
            className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md"
            name="code"
            value={newCoupon.code}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Coupon Discount Value"
            min={1}
            max={100}
            className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md"
            name="discountValue"
            value={newCoupon.discountValue}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex gap-2 max-sm:flex-col mt-2">
          <input
            type="text"
            placeholder="Coupon Description"
            className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md"
            name="description"
            value={newCoupon.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Coupon discount Type"
            className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md"
            name="discountType"
            value={newCoupon.discountType}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="number"
          placeholder="Coupon maxUses"
          className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md"
          name="maxUses"
          value={newCoupon.maxUses}
          onChange={handleChange}
          required
        />

        <label>
          <p className="mt-3">Coupon Expiry Date</p>
          <input
            type="date"
            placeholder="Coupon Expires At"
            className="w-full mt-1 p-2 border border-slate-200 outline-slate-400 rounded-md"
            name="expiresAt"
            value={newCoupon.expiresAt}
            onChange={handleChange}
          />
        </label>

        <div className="mt-5">
          <div className="flex gap-2 mt-3">
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                name="isActive"
                checked={newCoupon.isActive}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, isActive: e.target.checked })
                }
              />
              <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
              <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
            </label>
            <p>Is Active</p>
          </div>
        </div>
        <button className="mt-4 p-2 px-10 rounded bg-slate-700 text-white active:scale-95 transition">
          Add Coupon
        </button>
      </form>

      {/* List Coupons */}
      <div className="mt-14">
        <h2 className="text-2xl">
          List <span className="text-slate-800 font-medium">Coupons</span>
        </h2>
        <div className="overflow-x-auto mt-4 rounded-lg border border-slate-200 max-w-4xl">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">
                  Code
                </th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">
                  Description
                </th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">
                  Discount Type
                </th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">
                  Discount Value
                </th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">
                  Expires At
                </th>
                <th className="py-3 px-4 text-left font-semibold text-slate-600">
                  Is Active
                </th>

                <th className="py-3 px-4 text-left font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {coupons.map((coupon) => (
                <tr key={coupon?.couponCode} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {coupon?.couponCode}
                  </td>
                  <td className="py-3 px-4 text-slate-800">
                    {coupon?.couponDescription}
                  </td>
                  <td className="py-3 px-4 text-slate-800">
                    {coupon?.discountType === "percentage"
                      ? `${coupon.discountType}%`
                      : `${currency}${coupon.discountType}`}{" "}
                  </td>
                  <td className="py-3 px-4 text-slate-800">
                    {coupon?.discountType === "percentage"
                      ? `${coupon.discountValue}%`
                      : `${currency}${coupon.discountValue}`}
                  </td>
                  <td className="py-3 px-4 text-slate-800">
                    {format(coupon.expiryDate, "yyyy-MM-dd")}
                  </td>
                  <td className="py-3 px-4 text-slate-800">
                    {coupon.isActive ? "Yes" : "No"}
                  </td>

                  <td className="py-3 px-4 text-slate-800">
                    <DeleteIcon
                      onClick={() =>
                        toast.promise(deleteCoupon(coupon.code), {
                          loading: "Deleting coupon...",
                        })
                      }
                      className="w-5 h-5 text-red-500 hover:text-red-800 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
