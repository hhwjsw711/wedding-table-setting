import { App } from "@/App";
import { LEGACY_STATE_QUERY_KEY, STATE_QUERY_KEY } from "@/planner/constants";
import type { PlannerState } from "@/planner/types";
import { decodeState } from "@/planner/utils";

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const initialState = decodeInitialState(await searchParams);
  return <App initialState={initialState ?? undefined} />;
}

function decodeInitialState(searchParams: Record<string, string | string[] | undefined>): PlannerState | null {
  const encoded = getSearchParam(searchParams, STATE_QUERY_KEY) ?? getSearchParam(searchParams, LEGACY_STATE_QUERY_KEY);
  return encoded ? decodeState(encoded) : null;
}

function getSearchParam(searchParams: Record<string, string | string[] | undefined>, key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}
