import { z } from 'zod';
import { DEFAULT_GATEWAY_URL, JWT_TOKEN } from './constants';

const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['online', 'offline', 'degraded']),
  lastSeen: z.string()
});

export type Agent = z.infer<typeof agentSchema>;

async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${DEFAULT_GATEWAY_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(JWT_TOKEN ? { Authorization: `Bearer ${JWT_TOKEN}` } : {}),
      ...init?.headers
    }
  });

  if (!response.ok) {
    throw new Error(`Gateway request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function listAgents(): Promise<Agent[]> {
  const payload = await fetchJSON<unknown>('/agents');
  const parsed = z.array(agentSchema).safeParse(payload);
  if (!parsed.success) {
    console.error(parsed.error.flatten());
    return [];
  }
  return parsed.data;
}

export async function gatewayVersion(): Promise<string> {
  const payload = await fetchJSON<{ version: string }>('/version');
  return payload.version;
}
