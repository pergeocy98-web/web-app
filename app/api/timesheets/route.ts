import { prisma } from "@/lib/prisma"; import { NextResponse } from "next/server";
export async function GET(){ const items = await prisma.timesheet.findMany({ include: { employee: true }, orderBy: { createdAt: "desc" } }); return NextResponse.json(items); }
export async function POST(req: Request){
  const body = await req.json();
  const t = await prisma.timesheet.create({ data: { employeeId: body.employeeId, declaredStart: new Date(body.declaredStart), declaredEnd: new Date(body.declaredEnd), declaredBreakMins: body.declaredBreakMins ?? 0 } });
  return NextResponse.json(t,{ status:201 });
}
