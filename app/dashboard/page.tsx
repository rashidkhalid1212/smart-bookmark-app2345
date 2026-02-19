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
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">
          Welcome {user.email}
        </h1>

        <button
          onClick={logout}
          className="text-sm bg-gray-800 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <BookmarkForm userId={user.id} />
      <BookmarkList userId={user.id} />
    </div>
  );
}
