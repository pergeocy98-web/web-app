'use client'; import useSWR from "swr";
const fetcher = (u:string)=>fetch(u).then(r=>r.json());
export default function TimesheetsPage(){
  const { data, mutate } = useSWR("/api/timesheets", fetcher);
  if(!data) return <div className="p-8">Chargement…</div>;
  const validate = async (id:string, status:"VALIDE"|"REFUSE") => {
    await fetch(`/api/timesheets/${id}`,{ method:"PATCH", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ status }) });
    mutate();
  };
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Heures déclarées</h1>
      <div className="card overflow-x-auto">
        <table className="table"><thead><tr><th>Salarié</th><th>Début</th><th>Fin</th><th>Pause</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>{data.map((t:any)=>(<tr key={t.id}><td>{t.employee?.firstName} {t.employee?.lastName}</td><td>{new Date(t.declaredStart).toLocaleString()}</td><td>{new Date(t.declaredEnd).toLocaleString()}</td><td>{t.declaredBreakMins} min</td><td>{t.status}</td><td><button className="btn" onClick={()=>validate(t.id,"VALIDE")}>Valider</button> <button className="btn" onClick={()=>validate(t.id,"REFUSE")}>Refuser</button></td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
