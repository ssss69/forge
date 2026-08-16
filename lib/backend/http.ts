export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new Error("Request body must be valid JSON");
  }
}

export function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "")}`;
}

export const demoUserId = "demo_user";
