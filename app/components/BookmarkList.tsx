"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { toAbsoluteUrl } from "@/lib/utils";

export default function BookmarkList({ userId }: { userId: string }) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const supabase = getSupabaseClient();

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();

    // ✅ Realtime subscription
    const channel = supabase
      .channel("bookmark-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        Your bookmarks
      </h2>

      {bookmarks.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-6 text-center text-xs text-slate-400">
          You don&apos;t have any bookmarks yet. Add your first link above.
        </div>
      )}

      <div className="space-y-3">
        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="group flex items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm shadow-sm transition hover:border-slate-700 hover:bg-slate-900"
          >
            <div className="min-w-0">
              <a
                href={toAbsoluteUrl(b.url)}
                target="_blank"
                rel="noreferrer"
                className="line-clamp-1 font-medium text-blue-400 hover:text-blue-300 hover:underline"
              >
                {b.title}
              </a>
              <p className="mt-0.5 break-all text-[11px] text-slate-400">
                {toAbsoluteUrl(b.url)}
              </p>
            </div>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="ml-2 shrink-0 rounded-full border border-transparent px-3 py-1 text-[11px] font-medium text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
