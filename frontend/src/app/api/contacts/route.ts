import { NextResponse } from "next/server";

const MOCK = [
  { id: "1", firstName: "Ivan", lastName: "Ivanov", email: "ivan@example.com" },
];

export async function GET() {
  return NextResponse.json(MOCK);
}

export async function POST(request: Request) {
  const data = await request.json();
  MOCK.push({ id: String(MOCK.length + 1), ...data });
  return NextResponse.json(data, { status: 201 });
}
