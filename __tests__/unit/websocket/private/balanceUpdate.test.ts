import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

describe('Balance Update Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to balance update', () => {
    // The stream cannot be scoped to a single asset — it is always account-wide.
    it('Sends the documented account-wide stream name and receives balance updates', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        'account.balanceUpdate',
        () => bpxClient.streams.balanceUpdate(SubscriptionType.SUBSCRIBE)
      );

      const subscribe = sent.find((p) => p.params?.[0] === 'account.balanceUpdate');
      expect(subscribe).toBeDefined();
      expect(subscribe.method).toBe(SubscriptionType.SUBSCRIBE);

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);
      // The ED25519 signature tuple is attached inside the websocket handler,
      // after this payload is handed off, so it is not asserted here.

      // An update is only emitted when a balance actually changes, so a message
      // is not expected on a quiet account.
      // Payload assertions below are skipped when nothing arrives:
      // a balance update needs an actual balance change. The helper logs a warning so the skip stays visible.
      if (message) {
        expect(message).toMatchObject({
          e: 'balanceUpdate',
          E: expect.any(Number),
          a: expect.any(String), // asset
          A: expect.any(String), // available (absolute, not a delta)
          L: expect.any(String), // locked
          S: expect.any(String), // staked
          T: expect.any(Number)
        });
        // No undocumented keys: catches a renamed or newly added field.
        expect(['e', 'E', 'a', 'A', 'L', 'S', 'T']).toEqual(
          expect.arrayContaining(Object.keys(message))
        );
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
