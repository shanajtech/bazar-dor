"use client";


import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast, Toaster } from "sonner";
import { authClient } from "../../lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    const form = new FormData(event.currentTarget);
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: String(form.get("email") ?? "").trim(),
        password: String(form.get("password") ?? ""),
      });
      if (error) { toast.error(error.message || "সাইন ইন করা যায়নি"); return; }
      router.push("/profile");
      router.refresh();
    } catch { toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন"); }
    finally { setLoading(false); }
  };
  const socialUnavailable = () => toast.info("Google/GitHub লগইন এখনো সেটআপ করা হয়নি। ইমেইল ও পাসওয়ার্ড ব্যবহার করুন।");
  return (
    <main className="min-h-[650px] bg-[#f0f6f1] px-4 pb-24 pt-12">
      <Toaster position="top-right" richColors />
      <div className="mx-auto max-w-[440px]">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#1d2b22]">
            সাইন ইন
          </h1>
          <p className="mt-2 text-sm text-[#7a877d]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল পেতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#e1eae3] bg-white p-6">
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#1d2b22]"
              >
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#1d2b22] outline-none focus:border-[#05893E]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#1d2b22]"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                className="w-full rounded-lg border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#1d2b22] outline-none focus:border-[#05893E]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#05893E] px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_0_#b9d9c3] transition hover:bg-[#047232]"
            >
              সাইন ইন
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#e1eae3]" />
            <span className="text-xs text-[#7a877d]">অথবা</span>
            <div className="h-px flex-1 bg-[#e1eae3]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={socialUnavailable}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce6df] px-3 py-3 text-xs font-semibold text-[#1d2b22] transition hover:bg-[#f6faf7]"
            >
              <FcGoogle className="h-4 w-4 shrink-0" />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={socialUnavailable}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce6df] px-3 py-3 text-xs font-semibold text-[#1d2b22] transition hover:bg-[#f6faf7]"
            >
              <FaGithub className="h-4 w-4 shrink-0 text-[#24292F]" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-[#7a877d]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#05893E] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-[#8b968e] hover:text-[#05893E]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}

