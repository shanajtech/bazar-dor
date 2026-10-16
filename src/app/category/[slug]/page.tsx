
import CategoryProducts from "./CategoryProducts";

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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let category: Category | null = null;
  let products: Product[] = [];

  try {
    const [categoryResponse, productsResponse] = await Promise.all([
      fetch(
        `https://openapi.programming-hero.com/api/bazardor/categories/${encodeURIComponent(slug)}`,
        { next: { revalidate: 60 } }
      ),
      fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`,
        { next: { revalidate: 60 } }
      ),
    ]);

    if (categoryResponse.ok) {
      const categoryData = await categoryResponse.json();
      category = categoryData?.data ?? categoryData;
    }

    if (productsResponse.ok) {
      const productData = await productsResponse.json();
      products = Array.isArray(productData)
        ? productData
        : Array.isArray(productData?.data)
          ? productData.data
          : [];
    }
  } catch (error) {
    console.error("Category loading error:", error);
  }

  return (
    <CategoryProducts
      category={category}
      products={products}
    />
  );
}

