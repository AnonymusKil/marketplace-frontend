"use client";
import { ME } from "../../../src/graphql/mutations/auth";
import { LOGOUT } from "../../../src/graphql/mutations/auth";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";
import {
  User,
  Mail,
  ShieldCheck,
  Store,
  LogOut,
  Settings,
  UserPlus,
  Loader2,
  XCircle,
} from "lucide-react";

const ProfilePage = () => {
  const [token, setToken] = useState(null);
  const [logout] = useMutation(LOGOUT);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const { data, loading } = useQuery(ME, {
    skip: !token,
  });
  if (loading) return <Loading />;

  const client = useApolloClient();
  const router = useRouter();

  const user = data?.me;

  const handleLogOut = async () => {
    try {
      const { data } = await logout();
      console.log("Logout successful:", data);

      localStorage.removeItem("token");
      await client.clearStore();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <section className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="size-28 rounded-full bg-indigo-500 text-white flex items-center justify-center text-4xl font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "C"}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-800">
              {user?.name || "Anonymuskil"}
            </h1>

            <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-slate-500">
              <Mail size={16} />
              {user?.email || "user@example.com"}
            </div>

            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
              <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium flex items-center gap-2">
                <ShieldCheck size={16} />
                {user?.role || "customer"}
              </span>

              {user?.sellerStatus === "approved" ? (
                <span className="px-4 py-1 rounded-full bg-green-100 text-green-600 text-sm font-medium flex items-center gap-2">
                  <Store size={16} />
                  Approved Seller
                </span>
              ) : user?.sellerStatus === "pending" ? (
                <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Pending Approval
                </span>
              ) : user?.sellerStatus === "rejected" ? (
                <span className="px-4 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
                  <XCircle size={16} />
                  Application Rejected
                </span>
              ) : (
                <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium flex items-center gap-2">
                  <UserPlus size={16} />
                  Not a Seller
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <button className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-left">
            <User className="text-indigo-500 mb-4" size={28} />
            <h2 className="font-semibold text-slate-800 text-lg">
              Edit Profile
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Update your personal information
            </p>
          </button>

          <button className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-left">
            <Settings className="text-green-500 mb-4" size={28} />
            <h2 className="font-semibold text-slate-800 text-lg">
              Account Settings
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage preferences and security
            </p>
          </button>

          <button
            onClick={handleLogOut}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-left"
          >
            <LogOut className="text-red-500 mb-4" size={28} />
            <h2 className="font-semibold text-slate-800 text-lg">Logout</h2>
            <p className="text-sm text-slate-500 mt-1">
              Sign out from your account
            </p>
          </button>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Recent Orders
            <Link href="/orders" className="text-indigo-600 hover:underline">
              Click to view your orders
            </Link>
          </h2>

          <div className="border border-dashed border-slate-300 rounded-2xl p-10 text-center">
            <p className="text-slate-500">No orders yet.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
