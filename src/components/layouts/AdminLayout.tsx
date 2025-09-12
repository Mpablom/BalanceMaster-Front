import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Tooltip.Provider>
      <div className="flex h-screen w-screen bg-[#f1f1f1] text-gray-400">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main
            className="flex-1 p-4 overflow-auto bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 dark:[bg-gradient-to-l from-gray-900 via-purple-900 to-gray-950]
 rounded-tl-lg"
          >
            <Outlet />
          </main>
        </div>
      </div>
    </Tooltip.Provider>
  );
}
