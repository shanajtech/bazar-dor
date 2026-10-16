"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";
import AuthSkeleton from "../../AuthSkeleton";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending, error: sessionError } = authClient.useSession();
  const [busy, setBusy] = useState(false);

  const updateName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const name = String(new FormData(event.currentTarget).get("name") ?? "").trim();
    if (!name) { toast.error("আপনার নাম লিখুন"); return; }
    setBusy(true);
    try {
      const { error } = await authClient.updateUser({ name });
      if (error) { toast.error(error.message || "তথ্য আপডেট করা যায়নি"); return; }
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch { toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন"); }
    finally { setBusy(false); }
  };

  if (isPending || !session && !sessionError) return <AuthSkeleton />;
  if (!session) return <main className="min-h-[650px] bg-[#f0f6f1] px-4 py-12 text-center">সেশন লোড করা যায়নি। পেজটি আবার লোড করুন।</main>;

  return <main className="min-h-[650px] bg-[#f0f6f1] px-4 pb-24 pt-12">
    <div className="mx-auto max-w-[650px]">
      <h1 className="text-2xl font-bold text-[#1d2b22]">প্রোফাইল আপডেট করুন</h1>
      <p className="mb-6 mt-2 text-sm text-[#7a877d]">আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।</p>
      <form noValidate onSubmit={updateName} aria-busy={busy} className="rounded-2xl border border-[#e1eae3] bg-white px-6 py-7">
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#1d2b22]">নাম</label>
        <input id="name" name="name" type="text" autoComplete="name" defaultValue={session.user.name} required disabled={busy} className="mb-5 w-full rounded-lg border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#1d2b22] outline-none focus:border-[#05893E]" />
        <button type="submit" disabled={busy} className="w-full rounded-lg bg-[#05893E] px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_0_#b9d9c3] transition hover:bg-[#047232] disabled:opacity-60">{busy ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}</button>
      </form>
      <Link href="/profile" className="mt-6 block text-center text-sm text-[#05893E] hover:underline">← আমার প্রোফাইলে ফিরে যান</Link>
    </div>
  </main>;
}
