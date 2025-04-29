// src/app/api/contacts/route.ts
import { NextRequest, NextResponse } from "next/server";
const BASE = process.env.NEXT_PUBLIC_DJANGO_API_URL!.replace(/\/$/, "");

export async function GET(request: NextRequest) {
  const qs = request.nextUrl.search;
  const res = await fetch(`${BASE}/contacts/${qs}`, {
    headers: { Accept: "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch(`${BASE}/contacts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    return NextResponse.json({ detail: text }, { status: res.status });
  }

  const data = JSON.parse(text);
  return NextResponse.json(data, { status: res.status });
}
