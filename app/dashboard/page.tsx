"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const supabase = getSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, [router, supabase]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-6 py-4 text-sm text-slate-300 shadow-lg backdrop-blur-md">
          Checking your session...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Dashboard
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">
              Welcome, <span className="text-blue-400">{user.email}</span>
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Save links you care about. We keep them private to your account.
            </p>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-sm transition hover:border-slate-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Logout
          </button>
        </div>

        <div className="space-y-6">
          <BookmarkForm userId={user.id} />
          <BookmarkList userId={user.id} />
        </div>
      </div>
    </div>
  );
}
