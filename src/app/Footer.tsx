
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e5eae5] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <Link
            href="/"
            className="text-lg font-bold text-[#1d2b22]"
          >
          </Link>

          <p className="mt-2 text-sm text-[#657369]">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <p className="max-w-md text-sm leading-7 text-[#657369] md:text-right">
         সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
