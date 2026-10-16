"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { toast, Toaster } from "sonner";
import { authClient } from "../lib/auth-client";

export default function AuthFeedback() {
  const pathname = usePathname();
  useEffect(() => {
    const url = new URL(window.location.href);
    const result = url.searchParams.get("auth");
    const error = url.searchParams.get("error");
    if (result !== "success" && result !== "error" && result !== "linked" && result !== "required" && !error) return;
    url.searchParams.delete("auth");
    url.searchParams.delete("error");
    url.searchParams.delete("error_description");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    if (result === "required") {
      toast.info("বিস্তারিত দেখতে আগে সাইন ইন করুন", { id: "sign-in-required" });
    } else if (error === "account_not_linked") {
      toast.error("এই ইমেইলে আগে অ্যাকাউন্ট আছে। আগের পদ্ধতিতে সাইন ইন করে প্রোফাইল থেকে GitHub বা Google যুক্ত করুন।", { duration: 10000 });
    } else if (result === "error" || error) {
      toast.error("সোশ্যাল লগইন সম্পন্ন হয়নি। আবার চেষ্টা করুন");
    } else if (result === "linked") {
      toast.success("লগইন পদ্ধতি সফলভাবে যুক্ত হয়েছে");
    } else {
      void authClient.getSession().then(({ data }) => {
        if (data?.user) toast.success("সফলভাবে সাইন ইন হয়েছে", { id: "social-sign-in-success" });
      }).catch(() => { toast.error("সেশন যাচাই করা যায়নি"); });
    }
  }, [pathname]);
  return <Toaster position="top-right" richColors />;
}
