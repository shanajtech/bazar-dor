
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
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
}

export const dynamic = "force-dynamic";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

function formatBangla(value: number) {
  return value.toLocaleString("bn-BD");
}

function getUnit(unit: string) {
  if (unit === "kg") return "কেজি";
  if (unit === "liter" || unit === "litre" || unit === "l") {
    return "লিটার";
  }
  if (unit === "dozen") return "ডজন";
  if (unit === "piece" || unit === "pcs" || unit === "pc") {
    return "পিস";
  }
  if (unit === "hali") return "হালি";

  return unit;
}

function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col rounded-xl border border-[#e5eae5] bg-white p-4 transition hover:border-[#c9dfce] hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f7f2] text-2xl">
        {product.image}
      </div>

      <div><h3 className="text-base font-bold text-[#1d2b22] transition group-hover:text-[#05893E]">
        {product.nameBn}
      </h3>

      <p className="mt-1 text-xs text-[#7a857c]">
        প্রতি {getUnit(product.unit)}
      </p>
      </div></div>

      <div className="mt-auto pt-3">
        <div>
          <p className="mb-1 text-xs text-[#7a857c]">
            আজকের দাম
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-lg font-bold text-[#1d2b22]">
              {formatBangla(product.today)} টাকা
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
}

function ProductSection({
  title,
  subtitle,
  products,
  id,
  arrow,
  arrowColor,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  id?: string;
  arrow?: string;
  arrowColor?: string;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl scroll-mt-8 px-4 pb-12 sm:px-6 lg:px-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1d2b22] sm:text-[28px]">
          {title}{" "}
          {arrow && (
            <span style={{ color: arrowColor }}>
              {arrow}
            </span>
          )}
        </h2>

        {subtitle && (
          <p className="mt-2 text-sm text-[#7a857c] sm:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-[#e5eae5] bg-white px-5 py-10 text-center text-[#7a857c]">
          কোনো পণ্য পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default async function Home() {
  let products: Product[] = [];

  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Products API request failed");
    }

    const data = await response.json();

    products = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
        ? data.data
        : [];
  } catch (error) {
    console.error("Products loading error:", error);
  }

  const topRisers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const topFallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <main className="min-h-screen bg-[#f8faf8]">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="overflow-hidden rounded-2xl border border-[#e1eae3] bg-white">
          <div className="grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-10 lg:pr-6 lg:pl-14">
            <div className="text-center lg:text-left">
              <p className="mb-4 inline-flex items-center rounded-full bg-[#edf8f0] px-4 py-2 text-xs font-semibold text-[#05893E] sm:text-sm">
                {today}
              </p>

              <h1 className="mb-5 text-3xl leading-[1.5] font-bold text-[#1d2b22] sm:text-4xl lg:text-[36px] lg:leading-[1.4]">
                আজকের বাজারের দাম এক নজরে
              </h1>

              <p className="mx-auto mb-7 max-w-lg text-sm leading-7 text-[#657369] sm:text-base lg:mx-0">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
              </p>

              <Link
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#05893E] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(5,137,62,0.25)] transition hover:bg-[#047232] sm:text-base"
              >
                সব পণ্য দেখুন
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="flex w-full items-center justify-center lg:justify-end">
              <Image
                src="/images/bazar-hero.png"
                alt="বাংলাদেশের নিত্যপ্রয়োজনীয় বাজারের পণ্যের ঝুড়ি"
                width={600}
                height={500}
                priority
                className="h-auto w-full max-w-[320px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <ProductSection
        title="আজ দাম বেড়েছে"
        arrow="▲"
        arrowColor="#D03739"
        products={topRisers}
      />

      <ProductSection
        title="আজ দাম কমেছে"
        arrow="▼"
        arrowColor="#1A9951"
        products={topFallers}
      />

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="নিত্যপ্রয়োজনীয় সব পণ্যের আজকের সর্বশেষ বাজারদর দেখুন।"
        products={products}
      />
    </main>
  );
}






