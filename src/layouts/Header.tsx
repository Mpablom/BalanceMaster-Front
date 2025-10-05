import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-[#f1f1f1] shadow-2xl">
      {/* Botón hamburguesa solo en mobile */}
      {onMenuClick && (
        <button
          className="md:hidden p-2 rounded hover:bg-[#2a223d] transition"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <h1 className="text-lg font-bold ml-4 text-gray-700">
        Balance Master POS
      </h1>
      <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700">
        Logout
      </button>
    </header>
  );
}
