
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <header className="border-b border-[#e7ebe7] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
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
              {today}
            </p>
          </div>
        </Link>

        <nav className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link
            href="/signin"
            className="text-xs font-semibold text-[#1d2b22] hover:text-[#05893E] sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-[#05893E] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#047232] sm:px-5 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </nav>
      </div>
    </header>
  );
}

