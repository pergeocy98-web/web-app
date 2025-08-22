import { prisma } from "@/lib/prisma"; import { NextResponse } from "next/server";
export async function GET() { const employees = await prisma.employee.findMany({ orderBy: { createdAt: "desc" } }); return NextResponse.json(employees); }
export async function POST(req: Request) {
  const body = await req.json();
  const e = await prisma.employee.create({ data: { firstName: body.firstName, lastName: body.lastName, phone: body.phone, address: body.address } });
  return NextResponse.json(e, { status: 201 });
}
