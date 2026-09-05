import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

const SYMBOL = 'SOL_USDC_PERP';

const ORDER_EVENTS = [
  'orderAccepted',
  'orderCancelled',
  'orderExpired',
  'orderFill',
  'orderModified',
  'triggerPlaced',
  'triggerFailed'
];

// Every field the stream documents. Used to catch renamed or undocumented keys
// without requiring optional ones to be present in a given message.
const ORDER_FIELDS = [
  'e', 'E', 's', 'c', 'S', 'o', 'f', 'q', 'Q', 'p', 'P', 'B', 'a', 'b', 'j', 'k',
  'd', 'g', 'Y', 'r', 'X', 'R', 'i', 't', 'l', 'z', 'Z', 'L', 'm', 'n', 'N', 'V',
  'T', 'O', 'I', 'H', 'y'
];

describe('Order Update Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to order update', () => {
    it('Sends the documented per-market stream name and receives order updates', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `account.orderUpdate.${SYMBOL}`,
        () => bpxClient.streams.orderUpdate(SubscriptionType.SUBSCRIBE, SYMBOL)
      );

      const subscribe = sent.find((p) => p.params?.[0] === `account.orderUpdate.${SYMBOL}`);
      expect(subscribe).toBeDefined();
      expect(subscribe.method).toBe(SubscriptionType.SUBSCRIBE);

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // Updates only arrive when the account's orders change.
      // Payload assertions below are skipped when nothing arrives:
      // an order update needs account order activity. The helper logs a warning so the skip stays visible.
      if (message) {
        expect(ORDER_EVENTS).toContain(message.e);
        expect(message).toMatchObject({
          E: expect.any(Number),
          s: SYMBOL,
          i: expect.any(String), // order id
          X: expect.any(String)  // order state
        });
        // No undocumented keys: catches a renamed or newly added field.
        expect(ORDER_FIELDS).toEqual(expect.arrayContaining(Object.keys(message)));
      }
    }, WS_TEST_TIMEOUT_MS);

    it('Omits the symbol when subscribing to all markets', async () => {
      const { sent } = await waitForStreamMessage(
        bpxClient,
        'account.orderUpdate',
        () => bpxClient.streams.orderUpdate(SubscriptionType.SUBSCRIBE),
        1000
      );

      expect(sent.find((p) => p.params?.[0] === 'account.orderUpdate')).toBeDefined();
    }, WS_TEST_TIMEOUT_MS);
  });
});
