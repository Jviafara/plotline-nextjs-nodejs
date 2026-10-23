"use client";

import Navbar from "@/components/organisms/Navbar";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/components/organisms/Sidebar"), {
  ssr: false,
  loading: () => <aside className="w-0 md:w-64" />,
});
import { ReactNode, Suspense, useEffect } from "react";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* SideBar */}
      <Sidebar />
      {/* SideBar */}
      <main
        className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 ${isSidebarCollapsed ? "" : "md:pl-64"} `}
      >
        {/* navbar */}
        <Navbar />
        {/* navbar */}
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>
        <Suspense fallback={<div className="p-6">Loading...</div>}>
          {children}
        </Suspense>
      </DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
