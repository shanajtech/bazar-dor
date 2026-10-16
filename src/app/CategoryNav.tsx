
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function CategoryNav() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <nav className="border-b border-[#e7ebe7] bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:justify-center lg:px-8">
        <Link
          href="/"
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            pathname === "/"
              ? "bg-[#05893E] text-white"
              : "text-[#36483c] hover:bg-[#edf7f0]"
          }`}
        >
          সব পণ্য
        </Link>

        {loading ? (
          <span className="text-sm text-gray-500">
            ক্যাটাগরি লোড হচ্ছে...
          </span>
        ) : (
          categories.map((category) => {
            const active = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#05893E] text-white"
                    : "text-[#36483c] hover:bg-[#edf7f0]"
                }`}
              >
                {category.icon} {category.nameBn}
              </Link>
            );
          })
        )}
      </div>
    </nav>
  );
}
