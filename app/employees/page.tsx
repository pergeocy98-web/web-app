import Link from "next/link"; import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Salariés</h1>
        <Link className="btn" href="/employees/new">Nouveau</Link>
      </div>
      <div className="card">
        <table className="table"><thead><tr><th>Nom</th><th>Téléphone</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>{employees.map(e => (<tr key={e.id}><td>{e.firstName} {e.lastName}</td><td>{e.phone || "-"}</td><td>{e.status}</td><td><Link className="btn" href={`/employees/${e.id}`}>Voir</Link></td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
