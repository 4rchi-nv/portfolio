import { redirect } from "next/navigation";

/** Fallback when middleware does not run; default locale matches `i18n/routing`. */
export default function RootPage() {
  redirect("/en");
}
