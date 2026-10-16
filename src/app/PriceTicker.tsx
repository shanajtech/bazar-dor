
"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.data;
        setProducts(Array.isArray(items) ? items : []);
      })
      .catch((error) => {
        console.error("Price ticker error:", error);
      });
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden border-b border-[#e7ebe7] bg-[#f1f7f2] py-3">
      <div className="ticker-track flex w-max items-center gap-8">
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs sm:text-sm"
          >
            <span className="text-base">{product.image}</span>

            <span className="font-semibold text-[#26362b]">
              {product.nameBn}
            </span>

            <span className="text-[#45564a]">
              {product.today.toLocaleString("bn-BD")} টাকা/
              {({ kg: "কেজি", litre: "লিটার", liter: "লিটার", l: "লিটার", dozen: "ডজন", piece: "পিস", pc: "পিস", pcs: "পিস", hali: "হালি" } as Record<string, string>)[product.unit] ?? product.unit}
            </span>

            <span
              className={`font-semibold ${
                product.change.dir === "up"
                  ? "text-[#D03739]"
                  : product.change.dir === "down"
                    ? "text-[#05893E]"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {Math.abs(product.change.pct).toLocaleString("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

