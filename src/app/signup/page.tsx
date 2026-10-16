
"use client";

import Link from "next/link";
import { socialLogin } from "../../lib/social-login";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import { authClient } from "../../lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    if (!e.currentTarget.checkValidity()) {
      toast.error("সঠিক ইমেইল ও প্রয়োজনীয় তথ্য পূরণ করুন");
      e.currentTarget.reportValidity();
      return;
    }
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে");
      router.push("/signin");
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    if (loading) return;
    setLoading(true);
    try { await socialLogin(provider); } finally { setLoading(false); }
  };
  return (
    <main className="min-h-[650px] bg-[#f0f6f1] px-4 pb-24 pt-12">

      <div className="mx-auto max-w-[440px]">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#1d2b22]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm text-[#7a877d]">
            বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#e1eae3] bg-white p-6">
          <form aria-busy={loading} noValidate onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#1d2b22]"
              >
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="যেমন: শানাজ আক্তার"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#1d2b22] outline-none focus:border-[#05893E]"
              />
            </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
                className="w-full rounded-lg border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#1d2b22] outline-none focus:border-[#05893E]"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-[#1d2b22]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
                className="w-full rounded-lg border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#1d2b22] outline-none focus:border-[#05893E]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#05893E] px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_0_#b9d9c3] transition hover:bg-[#047232] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
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
              disabled={loading}
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce6df] px-3 py-3 text-xs font-semibold text-[#1d2b22] transition hover:bg-[#f6faf7]"
            >
              <FcGoogle className="h-4 w-4 shrink-0" />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce6df] px-3 py-3 text-xs font-semibold text-[#1d2b22] transition hover:bg-[#f6faf7]"
            >
              <FaGithub className="h-4 w-4 shrink-0 text-[#24292F]" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-[#7a877d]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#05893E] hover:underline"
            >
              সাইন ইন করুন
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

