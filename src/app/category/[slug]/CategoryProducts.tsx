
"use client";

import Link from "next/link";
import { useState } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface Props {
  category: Category | null;
  products: Product[];
}

function bangla(value: number) {
  return value.toLocaleString("bn-BD");
}

function unitName(unit: string) {
  if (unit === "kg") return "কেজি";
  if (["liter", "litre", "l"].includes(unit)) return "লিটার";
  if (unit === "dozen") return "ডজন";
  if (["piece", "pc", "pcs"].includes(unit)) return "পিস";
  if (unit === "hali") return "হালি";
  return unit;
}

export default function CategoryProducts({
  category,
  products,
}: Props) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  if (!category || products.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8faf8] px-4 py-12">
        <div className="w-full max-w-md rounded-xl border border-[#e5eae5] bg-white px-6 py-12 text-center">
          <h1 className="text-3xl font-bold text-[#1d2b22]">
            ৪০৪
          </h1>

          <p className="mt-3 text-lg font-semibold text-[#1d2b22]">
            কোনো পণ্য পাওয়া যায়নি
          </p>

          <p className="mt-2 text-sm text-[#657369]">
            এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-[#05893E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#047232]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faf8]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 rounded-xl border border-[#e5eae5] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f1f7f2] text-3xl">
              {category.icon}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#1d2b22]">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-[#657369]">
                মোট {bangla(products.length)}টি পণ্য
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label
              htmlFor="sort"
              className="text-sm font-medium text-[#1d2b22]"
            >
              সাজান:
            </label>

            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-lg border border-[#dfe6df] bg-white px-4 py-2.5 text-sm text-[#1d2b22] outline-none focus:border-[#05893E]"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group flex h-full flex-col rounded-xl border border-[#e5eae5] bg-white p-4 transition hover:border-[#c9dfce] hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f7f2] text-2xl">
                  {product.image}
                </div>

                <div><h2 className="text-base font-bold text-[#1d2b22] transition group-hover:text-[#05893E]">
                  {product.nameBn}
                </h2>

                <p className="mt-1 text-xs text-[#7a857c]">
                  প্রতি {unitName(product.unit)}
                </p>
                </div></div>

                <div className="mt-auto pt-3">
                  <div>
                    <p className="mb-1 text-xs text-[#7a857c]">
                      আজকের দাম
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-lg font-bold text-[#1d2b22]">
                        {bangla(product.today)} টাকা
                      </span>

                      <span
                        className={`rounded-md px-2 py-1 text-xs font-semibold ${
                          isUp
                            ? "bg-[#FCEEEE] text-[#D03739]"
                            : isDown
                              ? "bg-[#EAF7EE] text-[#1A9951]"
                              : "bg-[#F0F1F0] text-[#707A72]"
                        }`}
                      >
                        {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                        {Math.abs(product.change.pct).toLocaleString("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
