import { prisma } from "@/lib/prisma"; import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function EmployeeDetail({ params }: { params: { id: string } }) {
  const e = await prisma.employee.findUnique({ where: { id: params.id } }); if (!e) return notFound();
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Fiche salarié</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <div className="text-sm text-slate-500">Identité</div>
          <div className="text-xl font-semibold mt-1">{e.firstName} {e.lastName}</div>
          <div className="mt-2">Téléphone : {e.phone || "-"}</div>
          <div>Adresse : {e.address || "-"}</div>
          <div>Statut : {e.status}</div>
        </div>
      </div>
    </div>
  );
}
