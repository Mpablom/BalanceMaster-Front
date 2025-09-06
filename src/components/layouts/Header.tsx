export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <button className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600">
        Logout
      </button>
    </header>
  );
}
