
// import type { Metadata } from "next";
// import { Hind_Siliguri } from "next/font/google";
// import Navbar from "./Navbar";
// import CategoryNav from "./CategoryNav";
// import "./globals.css";

// const hindSiliguri = Hind_Siliguri({
//   subsets: ["bengali", "latin"],
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "বাজার দর | Bazar Dor",
//   description:
//     "বাংলাদেশের প্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর, দাম বৃদ্ধি ও হ্রাসের তথ্য এক জায়গায়।",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="bn">
//       <body
//         className={`${hindSiliguri.className} min-h-screen bg-[#f8faf8] text-[#1d2b22] antialiased`}
//       >
//         <Navbar />
//         <CategoryNav />
//         {children}
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "./Navbar";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর | Bazar Dor",
  description:
    "বাংলাদেশের প্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর, দাম বৃদ্ধি ও হ্রাসের তথ্য এক জায়গায়।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${hindSiliguri.className} min-h-screen bg-[#f8faf8] text-[#1d2b22] antialiased`}
      >
        <Navbar />
        <CategoryNav />
        <PriceTicker />
        {children}
      </body>
    </html>
  );
}


