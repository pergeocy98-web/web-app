'use client';
import { useState } from "react"; import { useRouter } from "next/navigation";
export default function NewEmployeePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState(""); const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(""); const [address, setAddress] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await fetch("/api/employees", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ firstName, lastName, phone, address }) });
    if (r.ok) router.push("/employees");
  };
  return (
    <div className="max-w-lg card mx-auto mt-12">
      <h1 className="text-2xl font-semibold mb-4">Nouveau salarié</h1>
      <form onSubmit={submit} className="space-y-4">
        <div><div className="label">Prénom</div><input className="input" value={firstName} onChange={e=>setFirstName(e.target.value)} /></div>
        <div><div className="label">Nom</div><input className="input" value={lastName} onChange={e=>setLastName(e.target.value)} /></div>
        <div><div className="label">Téléphone</div><input className="input" value={phone} onChange={e=>setPhone(e.target.value)} /></div>
        <div><div className="label">Adresse</div><input className="input" value={address} onChange={e=>setAddress(e.target.value)} /></div>
        <button className="btn">Créer</button>
      </form>
    </div>
  );
}
