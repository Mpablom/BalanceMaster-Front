import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-[#1e1b2e] text-white shadow-md">
      {/* Botón hamburguesa solo en mobile */}
      {onMenuClick && (
        <button
          className="md:hidden p-2 rounded hover:bg-[#2a223d] transition"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <h1 className="text-lg font-semibold">Balance Master POS</h1>
      <button className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600">
        Logout
      </button>
    </header>
  );
}
