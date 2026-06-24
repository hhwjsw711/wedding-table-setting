import { NextResponse } from "next/server";

import { createSeatingPlanWorkbook } from "@/planner/export-workbook";
import { parsePlannerState } from "@/server/plan-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const state = parsePlannerState(body?.state);
    if (!state) return NextResponse.json({ error: "INVALID_STATE" }, { status: 400 });

    const planName = typeof body?.name === "string" ? body.name.trim() : "";
    const workbook = await createSeatingPlanWorkbook({ planName, state });
    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      headers: {
        "content-disposition": `attachment; filename="${createWorkbookFilename(planName)}.xlsx"`,
        "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "EXPORT_FAILED" }, { status: 500 });
  }
}

async function readJson(request: Request) {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function createWorkbookFilename(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "wedding-seating-plan"
  );
}
