import { NextRequest, NextResponse } from "next/server";
import { handleCustomerContinuity } from "../../../../../lib/brianco/continuity-service";

export async function GET() {
  return NextResponse.json({ ok: true, service: "Brian ^& Co Scalable Customer Continuity Service", nativeCustomerExperience: true, protectedLiveMutation: false });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await handleCustomerContinuity(body ?? {});
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false, customerMessage: "Brian ^& Co could not process that continuity request yet.", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
