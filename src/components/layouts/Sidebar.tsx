interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed md:static z-50 h-screen w-64 bg-[#1e1b2e] text-[#f3f4f6] flex flex-col p-4 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-xl font-bold mb-6 text-[#a78bfa]">
          Balance Master
        </h2>
        <nav className="flex flex-col space-y-2">
          <a
            href="/dashboard"
            className="hover:bg-[#2a223d] rounded-lg px-3 py-2 transition"
          >
            Dashboard
          </a>
          <a
            href="/products"
            className="hover:bg-[#2a223d] rounded-lg px-3 py-2 transition"
          >
            Productos
          </a>
        </nav>
      </div>
    </>
  );
}
