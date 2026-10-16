import { toast } from "react-hot-toast";
import { authClient } from "./auth-client";

export async function socialLogin(provider: "google" | "github", link = false) {
  try {
    const response = await fetch("/api/auth-providers");
    if (!response.ok) throw new Error("Provider check failed");
    const configured = await response.json();
    if (!configured[provider]) {
      toast.error(provider + " লগইন চালু করতে OAuth credentials সেট করতে হবে");
      return;
    }
    const { error } = await (link ? authClient.linkSocial : authClient.signIn.social)({
      provider,
      callbackURL: link ? "/profile?auth=linked" : "/?auth=success",
      errorCallbackURL: link ? "/profile?auth=error" : "/signin?auth=error",
    });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  } catch { toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন"); }
}
