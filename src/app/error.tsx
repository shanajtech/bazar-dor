"use client";
import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="mx-auto min-h-[60vh] max-w-lg px-4 py-20 text-center">
    <h1 className="text-2xl font-bold">তথ্য লোড করা যায়নি</h1>
    <p className="mt-3 text-sm text-[#657369]">সংযোগে সাময়িক সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
    <button onClick={reset} className="mt-6 rounded-lg bg-[#05893E] px-5 py-3 text-sm font-semibold text-white">আবার চেষ্টা করুন</button>
    <Link href="/" className="mt-4 block text-sm text-[#05893E]">হোম পেজে ফিরে যান</Link>
  </main>;
}
