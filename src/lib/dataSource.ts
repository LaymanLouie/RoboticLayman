export type DataSourceMode = "static" | "supabase";

export const DATA_SOURCE_MODE: DataSourceMode = "static";

export const isStaticMode = (): boolean => (DATA_SOURCE_MODE as DataSourceMode) === "static";
export const isSupabaseMode = (): boolean => (DATA_SOURCE_MODE as DataSourceMode) === "supabase";

