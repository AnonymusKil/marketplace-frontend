"use client";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import useAuth from "../../hook/useAuth";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { user, authloading, error } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authloading) return;
    console.log("AUTH STATE", {
      user,
      authloading,
      error,
      role: user?.role,
    });

    if (error || !user) {
      router.replace("/");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/");
    }
  }, [authloading, error, user, router]);

  if (authloading) {
    return <Loading />;
  }

  const isAdmin = user?.role === "admin";

  return isAdmin ? (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
        <AdminSidebar />
        <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl sm:text-4xl font-semibold text-slate-400">
        You are not authorized to access this page
      </h1>
      <Link
        href="/"
        className="bg-slate-700 text-white flex items-center gap-2 mt-8 p-2 px-6 max-sm:text-sm rounded-full"
      >
        Go to home <ArrowRightIcon size={18} />
      </Link>
    </div>
  );
};

export default AdminLayout;
