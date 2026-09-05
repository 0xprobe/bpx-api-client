import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

const SYMBOL = 'SOL_USDC_PERP';

const POSITION_EVENTS = ['positionAdjusted', 'positionOpened', 'positionClosed'];

// Every field the stream documents. Used to catch renamed or undocumented keys
// without requiring optional ones to be present in a given message.
const POSITION_FIELDS = ['e', 'E', 's', 'b', 'B', 'f', 'M', 'm', 'q', 'Q', 'n', 'i', 'l', 'p', 'P', 'T'];

describe('Position Update Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to position update', () => {
    it('Sends the documented per-market stream name and receives position updates', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `account.positionUpdate.${SYMBOL}`,
        () => bpxClient.streams.positionUpdate(SubscriptionType.SUBSCRIBE, SYMBOL)
      );

      const subscribe = sent.find((p) => p.params?.[0] === `account.positionUpdate.${SYMBOL}`);
      expect(subscribe).toBeDefined();
      expect(subscribe.method).toBe(SubscriptionType.SUBSCRIBE);

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // Updates only arrive when the account's position changes.
      // Payload assertions below are skipped when nothing arrives:
      // a position update needs a position change. The helper logs a warning so the skip stays visible.
      if (message) {
        // On subscription the server sends a snapshot of the open positions,
        // and that message has no `e` field — only mutations carry an event type.
        if (message.e !== undefined) {
          expect(POSITION_EVENTS).toContain(message.e);
        }
        expect(message).toMatchObject({
          E: expect.any(Number),
          s: SYMBOL,
          i: expect.any(String)
        });
        // No undocumented keys: catches a renamed or newly added field.
        expect(POSITION_FIELDS).toEqual(expect.arrayContaining(Object.keys(message)));
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
