
import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

function bangla(number: number) {
  return number.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

function unitName(unit: string) {
  if (unit === "kg") return "কেজি";
  if (["liter", "litre", "l"].includes(unit)) return "লিটার";
  if (unit === "dozen") return "ডজন";
  if (["piece", "pc", "pcs"].includes(unit)) return "পিস";
  if (unit === "hali") return "হালি";
  return unit;
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: Product | undefined;

  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to load products");
    }

    const data = await response.json();

    const products: Product[] = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
        ? data.data
        : [];

    product = products.find((item) => item.slug === slug);
  } catch (error) {
    console.error("Product details error:", error);
  }

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const minimum =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maximum =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const average =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : product.today;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <main className="min-h-screen bg-[#f8faf8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-[#657369]">
          <Link href="/" className="hover:text-[#05893E]">
            হোম
          </Link>
          <span className="mx-2">/</span>
          <span>{product.nameBn}</span>
        </nav>

        <section className="rounded-xl border border-[#e5eae5] bg-white p-5 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#f1f7f2] text-5xl">
              {product.image}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#1d2b22] sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm leading-7 text-[#657369]">
                বিভিন্ন বাজারে {product.nameBn}-এর আজকের সর্বনিম্ন,
                সর্বোচ্চ ও গড় দাম দেখুন।
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-[#eaf7ee] px-3 py-1.5 text-sm font-medium text-[#05893E]">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>

                <span className="rounded-md bg-[#f1f3f1] px-3 py-1.5 text-sm text-[#657369]">
                  প্রতি {unitName(product.unit)}
                </span>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-sm text-[#657369]">আজকের দাম</p>

              <p className="mt-1 text-2xl font-bold text-[#1d2b22]">
                {bangla(product.today)} টাকা
              </p>

              <span
                className={`mt-2 inline-block rounded-md px-3 py-1 text-sm font-semibold ${
                  isUp
                    ? "bg-[#FCEEEE] text-[#D03739]"
                    : isDown
                      ? "bg-[#EAF7EE] text-[#1A9951]"
                      : "bg-[#F0F1F0] text-[#707A72]"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {bangla(product.change.pct)}%
              </span>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-5 text-xl font-bold text-[#1d2b22] sm:text-2xl">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e5eae5] bg-white p-5">
              <p className="text-sm text-[#657369]">
                সর্বনিম্ন দাম
              </p>
              <p className="mt-3 text-2xl font-bold text-[#1d2b22]">
                {bangla(minimum)} টাকা
              </p>
            </div>

            <div className="rounded-xl border border-[#e5eae5] bg-white p-5">
              <p className="text-sm text-[#657369]">
                সর্বোচ্চ দাম
              </p>
              <p className="mt-3 text-2xl font-bold text-[#1d2b22]">
                {bangla(maximum)} টাকা
              </p>
            </div>

            <div className="rounded-xl border border-[#e5eae5] bg-white p-5">
              <p className="text-sm text-[#657369]">
                গড় দাম
              </p>
              <p className="mt-3 text-2xl font-bold text-[#1d2b22]">
                {bangla(average)} টাকা
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-[#1d2b22] sm:text-2xl">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-[#e5eae5] bg-white">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#f1f7f2] text-[#1d2b22]">
                <tr>
                  <th className="px-5 py-4 font-semibold">
                    বাজার
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    বিভাগ
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    সর্বোচ্চ
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-[#edf0ed]"
                  >
                    <td className="px-5 py-4 font-medium text-[#1d2b22]">
                      {market.market}
                    </td>

                    <td className="px-5 py-4 text-[#657369]">
                      {market.division}
                    </td>

                    <td className="px-5 py-4">
                      {bangla(market.min)} টাকা
                    </td>

                    <td className="px-5 py-4">
                      {bangla(market.max)} টাকা
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#05893E]">
                      {bangla((market.min + market.max) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {markets.length === 0 && (
              <p className="p-6 text-center text-[#657369]">
                এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
