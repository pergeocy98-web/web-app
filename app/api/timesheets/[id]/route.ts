import { prisma } from "@/lib/prisma"; import { NextResponse } from "next/server";
export async function PATCH(req: Request, { params }: { params: { id: string } }){
  const body = await req.json();
  const t = await prisma.timesheet.update({ where: { id: params.id }, data: { status: body.status, validatedAt: new Date() } });
  return NextResponse.json(t);
}
