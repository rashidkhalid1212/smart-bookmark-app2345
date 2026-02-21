"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const supabase = getSupabaseClient();

  // ✅ Handle redirect after Google login
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [router, supabase]);

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/40">
            <Image
              src="/file.svg"
              alt="Smart Bookmark"
              width={24}
              height={24}
              className="text-blue-400"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Smart Bookmark App
            </h1>
            <p className="text-xs text-slate-400">
              Save and organize your links in seconds.
            </p>
          </div>
        </div>

        <div className="mb-6 space-y-2 text-sm text-slate-300">
          <p className="font-medium uppercase tracking-[0.18em] text-xs text-slate-400">
            Features
          </p>
          <ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
            <li>Sign in securely with your Google account</li>
            <li>Add bookmarks with title and URL</li>
            <li>Private bookmark list per user</li>
            <li>Realtime updates across open tabs</li>
          </ul>
        </div>

        <button
          onClick={loginWithGoogle}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 shadow-md transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <Image
            src="/window.svg"
            alt="Google"
            width={18}
            height={18}
            className="shrink-0"
          />
          <span>Continue with Google</span>
        </button>

        <p className="mt-3 text-center text-[11px] text-slate-500">
          We only support Google sign-in. No passwords to remember.
        </p>
      </div>
    </div>
  );
}
