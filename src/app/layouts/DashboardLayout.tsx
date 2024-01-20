"use client";
import type { Metadata } from "next";
import LeftSidebar from "@/components/dashboard/LeftSidebar";
import Navbar from "@/components/Navbar";

// export const metadata: Metadata = {
//   title: "Darkom Dashboard",
//   description: "Darkom Dashboard",
// };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="dark:bg-[#0d0d15] min-h-screen w-full h-full">
        <Navbar />
        <LeftSidebar />
        <div className="ml-[19rem]">{children}</div>
      </div>
    </main>
  );
}
