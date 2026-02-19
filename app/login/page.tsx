"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={loginWithGoogle}
        className="px-6 py-3 bg-black text-white rounded-xl"
      >
        Sign in with Google
      </button>
    </div>
  );
}
