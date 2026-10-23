import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AppStore } from "@/components/store";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "Train with intent. Log every set. Your no-nonsense workout companion.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppStore>
          <Navbar />
          <main className="page-shell">{children}</main>
          <Footer />
        </AppStore>
      </body>
    </html>
  );
}
