"use client";

import Link from "next/link";
import {GET_NOTIFICATIONS, MARK_ALL_NOTIFICATIONS_AS_READ,MARK_NOTIFICATION_AS_READ} from "../../../src/graphql/mutations/notification"
import { useMutation, useQuery } from "@apollo/client/react";
import { Socket } from "./../../../lib/socket";
import Loading from "../../../components/Loading";

import {
  Bell,
  CheckCheck,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function NotificationPage() {
  const { data:notificationData, loading, error } = useQuery(GET_NOTIFICATIONS);
  const notifications = notificationData?.getNotifications|| [];
  const [markAllNotificationsAsRead] = useMutation(MARK_ALL_NOTIFICATIONS_AS_READ, {
    refetchQueries: [GET_NOTIFICATIONS],
  });
  const [markNotificationAsRead] = useMutation(MARK_NOTIFICATION_AS_READ, {
    refetchQueries: [GET_NOTIFICATIONS],
  });
  
  return (
    <section className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <ArrowLeft className="cursor-pointer text-slate-600 hover:text-slate-900" />
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Notifications
              </h1>

              <p className="text-sm text-slate-500">
                Stay updated with your latest activities
              </p>
            </div>
          </div>

          <button
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition"
          >
            <CheckCheck size={18} />
            Mark all read
          </button>
        </div>

        {/* Notifications */}
        <div className="mt-6 space-y-4">

          {notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-sm p-5 transition hover:shadow-md cursor-pointer border-l-4 ${
                  item.read
                    ? "border-transparent"
                    : "border-indigo-500"
                }`}
              >
                <div className="flex justify-between items-start">

                  <div className="flex gap-4" onClick={() => markNotificationAsRead({ variables: { notificationId: item.id } })}>

                    <div
                      className={`mt-1 rounded-full p-2 ${
                        item.read
                          ? "bg-slate-100"
                          : "bg-indigo-100"
                      }`}
                    >
                      <Bell
                        size={18}
                        className={
                          item.read
                            ? "text-slate-500"
                            : "text-indigo-600"
                        }
                      />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-800">
                        {item.title}
                      </h2>

                      <p className="text-slate-500 mt-1">
                        {item.message}
                      </p>

                      <p className="text-xs text-slate-400 mt-3">
                        {item.createdAt}
                      </p>
                    </div>

                  </div>

                  
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-sm py-20 text-center">

              <CheckCircle2
                size={60}
                className="mx-auto text-slate-300"
              />

              <h2 className="text-xl font-semibold mt-5 text-slate-700">
                You're all caught up!
              </h2>

              <p className="text-slate-500 mt-2">
                No notifications available.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}