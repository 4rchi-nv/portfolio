import "./globals.css";
export { metadata } from "@/lib/site-metadata";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
