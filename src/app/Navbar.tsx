"use client";
import { authClient } from "../lib/auth-client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();
  const signOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      const { error } = await authClient.signOut();
      if (error) { toast.error("সাইন আউট করা যায়নি"); return; }
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.replace("/"); router.refresh();
    } catch { toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন"); }
    finally { setSigningOut(false); }
  };
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <header className="border-b border-[#e7ebe7] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image
            src="/images/logo-icon.png"
            alt="বাজার দর লোগো"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-xl object-contain"
          />

          <div className="min-w-0">
            <h1 className="text-base font-bold text-[#1D271F] sm:text-lg">
              বাজার দর
            </h1>

            <p className="text-[10px] text-[#68756d] sm:text-xs">
              <span suppressHydrationWarning>{today}</span>
            </p>
          </div>
        </Link>

        <nav className="flex shrink-0 items-center gap-2 sm:gap-4">
          {isPending ? <div aria-label="লোড হচ্ছে" className="h-9 w-24 sm:w-36 animate-pulse rounded-lg bg-[#e5eee7]" /> : session ? (
            <details className="relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e5f5e9] font-bold text-[#05893E]">
                  {new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(session.user.name.trim())[Symbol.iterator]().next().value?.segment.toLocaleUpperCase() || "?"}
                </span>
                <span className="hidden max-w-32 truncate sm:block">{session.user.name}</span>
                <span aria-hidden="true" className="text-xs text-[#7a877d]">⌄</span>
                <span className="sr-only">অ্যাকাউন্ট মেনু</span>
              </summary>
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-[#e1eae3] bg-white p-2 shadow-lg">
                <Link href="/profile" onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")} className="block rounded-lg px-3 py-2 text-sm hover:bg-[#f0f6f1]">আমার প্রোফাইল</Link>
                <button type="button" onClick={signOut} disabled={signingOut} className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#D03739] hover:bg-[#fff4f4] disabled:opacity-60">{signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}</button>
              </div>
            </details>
          ) : <>
          <Link
            href={session ? "/profile" : "/signin"}
            className="text-xs font-semibold text-[#1d2b22] hover:text-[#05893E] sm:text-sm"
          >
            {session ? "আমার প্রোফাইল" : "সাইন ইন"}
          </Link>

          {!session && <Link
            href="/signup"
            className="rounded-lg bg-[#05893E] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#047232] sm:px-5 sm:text-sm"
          >
            সাইন আপ
          </Link>}
          </>}
        </nav>
      </div>
    </header>
  );
}

