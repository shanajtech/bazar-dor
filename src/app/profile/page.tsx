"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../../lib/auth-client";
import { socialLogin } from "../../lib/social-login";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import AuthSkeleton from "../AuthSkeleton";

import { FiLogOut } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, error: sessionError } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  const linkProvider = async (provider: "google" | "github") => {
    if (busy) return;
    setBusy(true);
    try { await socialLogin(provider, true); }
    finally { setBusy(false); }
  };
  useEffect(() => {
    if (!isPending && !session && !sessionError) router.replace("/signin");
  }, [isPending, session, sessionError, router]);
  const signOut = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const { error } = await authClient.signOut();
      if (error) { toast.error("সাইন আউট করা যায়নি"); return; }
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.replace("/signin"); router.refresh();
    } catch { toast.error("সংযোগে সমস্যা হয়েছে"); }
    finally { setBusy(false); }
  };
  const updateName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get("name") ?? "").trim();
    if (busy) return;
    if (!name) { toast.error("আপনার নাম লিখুন"); return; }
    setBusy(true);
    try {
      const { error } = await authClient.updateUser({ name });
      if (error) toast.error("আপডেট করা যায়নি");
      else toast.success("তথ্য আপডেট হয়েছে");
    } catch { toast.error("সংযোগে সমস্যা হয়েছে"); }
    finally { setBusy(false); }
  };
  if (isPending) return <AuthSkeleton />;
  if (!session) return <main className="min-h-[650px] bg-[#f0f6f1] px-4 pt-12 text-center">{sessionError ? "সংযোগে সমস্যা হয়েছে। পেজটি আবার লোড করুন।" : "অপেক্ষা করুন..."}</main>;
  return (
    <main className="min-h-[650px] bg-[#f0f6f1] px-4 pb-24 pt-12">
      <div className="mx-auto max-w-[650px]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1d2b22]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-[#7a877d]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl border border-[#e1eae3] bg-white px-6 py-5 sm:flex-nowrap">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e5f5e9] text-2xl font-bold text-[#05893E]">
            {new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(session.user.name.trim())[Symbol.iterator]().next().value?.segment.toLocaleUpperCase() || "?"}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="break-words text-lg font-bold text-[#1d2b22]">
              {session.user.name}
            </h2>
            <p className="mt-1 truncate text-sm text-[#7a877d]">
              {session.user.email}
            </p>
          </div>

   <button
  type="button"
  onClick={signOut}
  disabled={busy}
  className="flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#f0b7b7] px-4 py-2 text-sm font-semibold text-[#D03739] transition hover:bg-[#fff4f4] sm:w-auto"
>
  <FiLogOut className="h-4 w-4" />
  সাইন আউট
</button>
        </div>

        <div className="rounded-2xl border border-[#e1eae3] bg-white px-6 py-7">
          <h3 className="mb-7 text-lg font-bold text-[#1d2b22]">
            তথ্য
          </h3>

          <form noValidate onSubmit={updateName} aria-busy={busy}>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#1d2b22]"
            >
              নাম
            </label>

            <input
              id="name"
              name="name"
              key={session.user.name}
              defaultValue={session.user.name}
              type="text"
              required
              className="mb-4 w-full rounded-lg border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#1d2b22] outline-none focus:border-[#05893E]"
            />

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-[#05893E] px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_0_#b9d9c3] transition hover:bg-[#047232]"
            >
              আপডেট
            </button>
          </form>
          <p className="mb-3 mt-7 text-sm text-[#7a877d]">একই ইমেইলের Google বা GitHub অ্যাকাউন্ট যুক্ত করুন। এরপর সেটি দিয়েও সাইন ইন করতে পারবেন।</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button type="button" disabled={busy} onClick={() => linkProvider("google")} className="flex items-center justify-center gap-2 rounded-lg border border-[#dce6df] px-3 py-3 text-xs font-semibold text-[#1d2b22] transition hover:bg-[#f6faf7] disabled:opacity-60">
              <FcGoogle className="h-4 w-4 shrink-0" /> Google যুক্ত করুন
            </button>
            <button type="button" disabled={busy} onClick={() => linkProvider("github")} className="flex items-center justify-center gap-2 rounded-lg border border-[#dce6df] px-3 py-3 text-xs font-semibold text-[#1d2b22] transition hover:bg-[#f6faf7] disabled:opacity-60">
              <FaGithub className="h-4 w-4 shrink-0" /> GitHub যুক্ত করুন
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
