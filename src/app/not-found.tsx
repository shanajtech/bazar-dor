import Link from "next/link";

export default function NotFound() {
  return <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f6f1] px-4 py-12">
    <div className="w-full max-w-md rounded-2xl border border-[#e1eae3] bg-white p-8 text-center">
      <p className="text-5xl font-bold text-[#05893E]">৪০৪</p>
      <h1 className="mt-4 text-xl font-bold">পেজটি পাওয়া যায়নি</h1>
      <p className="mt-3 text-sm text-[#657369]">লিংকটি সঠিক নয় অথবা এই পণ্য বা ক্যাটাগরিটি নেই।</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-[#05893E] px-5 py-3 text-sm font-semibold text-white">হোম পেজে ফিরে যান</Link>
    </div>
  </main>;
}
