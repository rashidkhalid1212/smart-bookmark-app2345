"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.user_metadata.full_name}
      </h1>

      <BookmarkForm user={user} />
      <BookmarkList user={user} />
    </div>
  );
}
