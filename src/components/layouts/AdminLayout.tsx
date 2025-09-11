// AdminLayout.tsx
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Tooltip.Provider>
      <div className="flex h-screen w-screen bg-[#1e1b2e] text-gray-100">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-4 overflow-auto bg-gray-100 dark:bg-[#1e1b2e] rounded-tl-lg">
            <Outlet />
          </main>
        </div>
      </div>
    </Tooltip.Provider>
  );
}
