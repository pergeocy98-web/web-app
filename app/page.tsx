import Link from "next/link";
export default function Home() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Admin — Gestion des salariés (MVP)</h1>
      <div className="space-x-2">
        <Link className="btn" href="/employees">Salariés</Link>
        <Link className="btn" href="/timesheets">Heures</Link>
      </div>
    </main>
  );
}
