import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/component/footer";
import Navbar from "@/component/navbar";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "Pick a workout, build your plan, and track your fitness journey with FitLog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#0e0f13] text-white antialiased">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
