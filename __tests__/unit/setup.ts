import { BpxApiClient } from '../../src/bpxApiClient';

// Client for testing.
// Real credentials are read from a `.env` file (BPX_API_KEY / BPX_API_SECRET),
// loaded into process.env via dotenv (see `setupFiles` in jest.config.js), so
// private-endpoint integration tests can run against the live API. When they are
// not set, the placeholders are used (public-endpoint tests still pass;
// private-endpoint tests will fail to authenticate). See .env.example.
export function createClient() {
  return new BpxApiClient({
    apiKey: process.env.BPX_API_KEY || 'API-KEY',       // set BPX_API_KEY to your API key
    apiSecret: process.env.BPX_API_SECRET || 'API-SECRET', // set BPX_API_SECRET to your API secret
    debug: false
  });
}

// --- Websocket test helpers ---

// How long a websocket test waits for a live message. Low-frequency streams
// (liquidation, stockPrice outside market hours, balanceUpdate) often receive
// nothing; those tests still pass and simply skip the payload assertions.
// Override with BPX_WS_WAIT_MS in .env or on the command line.
export const WS_WAIT_MS = Number(process.env.BPX_WS_WAIT_MS) || 10000;

// Per-test timeout: must exceed WS_WAIT_MS to allow for connect + subscribe.
export const WS_TEST_TIMEOUT_MS = WS_WAIT_MS + 15000;

/**
 * Opens the websocket, subscribes via `subscribe`, and resolves with the first
 * message whose `stream` matches `streamName` — or `null` if none arrived
 * within `waitMs`. Always closes the connection before resolving.
 *
 * Returns three things:
 *  - `sent`     the payloads the client sent, so tests can assert the stream
 *               name was built correctly (the most common subscription bug)
 *  - `message`  the first matching stream payload, or `null`
 *  - `errors`   error frames the server sent back. The server rejects a bad
 *               subscription with e.g. `{ code: 4003, message: 'Invalid
 *               signature' }`, so an empty array is what proves a private
 *               stream actually authenticated — a quiet stream sends no ack.
 */
export async function waitForStreamMessage(
  client: ReturnType<typeof createClient>,
  streamName: string,
  subscribe: () => void,
  waitMs: number = WS_WAIT_MS
): Promise<{ sent: any[]; message: any | null; errors: any[] }> {
  const sent: any[] = [];
  const handler = client.streams as unknown as { wsHandler: { send: Function; sendWithSignature: Function } };
  const ws = handler.wsHandler;
  const origSend = ws.send.bind(ws);
  const origSigned = ws.sendWithSignature.bind(ws);
  ws.send = async (params: Record<string, any>) => { sent.push(params); return origSend(params); };
  ws.sendWithSignature = async (params: Record<string, any>) => { sent.push(params); return origSigned(params); };

  await client.streams.open();
  const errors: any[] = [];
  let message: any | null = null;
  try {
    const received = new Promise<any | null>((resolve) => {
      const timer = setTimeout(() => resolve(null), waitMs);
      client.streams.addMessageHandler((m: any) => {
        if (m?.error) {
          errors.push(m.error);
          return;
        }
        if (m?.stream === streamName || m?.stream?.startsWith?.(streamName)) {
          clearTimeout(timer);
          resolve(m?.data ?? m);
        }
      });
    });
    subscribe();
    message = await received;
    if (!message) {
      // Make the skipped payload assertions visible: a quiet stream still
      // passes, but the run should not look like the payload was verified.
      console.warn(
        `[${streamName}] no message within ${waitMs}ms — payload assertions skipped`
      );
    }
  } finally {
    ws.send = origSend;
    ws.sendWithSignature = origSigned;
    await client.streams.close().catch(() => undefined);
  }
  return { sent, message, errors };
}
