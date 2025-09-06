export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#1e1b2e] text-[#f3f4f6] flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6 text-[#a78bfa]">Balance Master</h2>
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
  );
}
