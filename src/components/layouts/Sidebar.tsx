import * as Tooltip from "@radix-ui/react-tooltip";
import { NavLink } from "react-router-dom";
import { Home, Box, Tags, Menu } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  open: boolean; // sidebar en móviles
  setOpen: (open: boolean) => void;
}

const links = [
  { name: "Dashboard", to: "/dashboard", icon: Home },
  { name: "Productos", to: "/products", icon: Box },
  { name: "Categorías", to: "/categories", icon: Tags },
];

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Overlay en móviles */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 h-screen bg-[#1e1b2e] text-[#f3f4f6] flex flex-col p-4
    transition-all duration-300
    ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
    ${collapsed ? "md:w-20" : "md:w-64"} w-64`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <h2 className="text-xl font-bold text-[#a78bfa]">Balance Master</h2>
          )}
          <button
            className="text-gray-400 hover:text-purple-400 md:hidden"
            onClick={() => setOpen(!open)}
          >
            X
          </button>
          <button
            className="text-gray-400 hover:text-purple-400 hidden md:flex items-center justify-center ml-2"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return collapsed ? (
              // Sidebar colapsado: solo icono + tooltip
              <Tooltip.Root key={link.to}>
                <Tooltip.Trigger asChild>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center justify-center rounded-lg p-2 transition hover:bg-[#2a223d] ${
                        isActive ? "bg-[#2a223d]" : ""
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-purple-400" : "text-gray-400"
                        }`}
                      />
                    )}
                  </NavLink>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="right"
                    className="bg-gray-900 text-white px-2 py-1 rounded text-sm shadow-lg z-50"
                  >
                    {link.name}
                    <Tooltip.Arrow className="fill-gray-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ) : (
              // Sidebar expandido: icono + nombre
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-[#2a223d] ${
                    isActive ? "bg-[#2a223d]" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-purple-400" : "text-gray-400"
                      }`}
                    />
                    {link.name}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
}
