import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

const RFQ_EVENTS = [
  'rfqActive',
  'rfqAccepted',
  'rfqRefreshed',
  'rfqCancelled',
  'rfqCandidate',
  'rfqAcceptedBinding',
  'rfqFilled',
  'quoteAccepted',
  'quoteCancelled'
];

// Fields this stream can carry. `C` (client RFQ id) and `S` (side) are optional
// and are often absent, so presence is not required — the list is used only to
// catch renamed or newly added keys.
//
// `z` is sent by the exchange but is not in the documented payload (observed on
// every live message); it is listed here so the check reflects reality.
const RFQ_FIELDS = ['e', 'E', 'R', 'C', 's', 'S', 'q', 'w', 'W', 'X', 'T', 'z'];

describe('RFQ Update Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to RFQ update', () => {
    it('Sends the documented account-wide stream name and receives RFQ updates', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        'account.rfqUpdate',
        () => bpxClient.streams.RFQUpdate(SubscriptionType.SUBSCRIBE)
      );

      const subscribe = sent.find((p) => p.params?.[0] === 'account.rfqUpdate');
      expect(subscribe).toBeDefined();
      expect(subscribe.method).toBe(SubscriptionType.SUBSCRIBE);

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // Updates only arrive while the account has RFQ activity.
      // Payload assertions below are skipped when nothing arrives:
      // an RFQ update needs account RFQ activity. The helper logs a warning so the skip stays visible.
      if (message) {
        expect(RFQ_EVENTS).toContain(message.e);
        expect(message).toMatchObject({
          E: expect.any(Number),
          R: expect.any(Number), // RFQ id arrives as a number on the stream
          X: expect.any(String), // RFQ status
          T: expect.any(Number)
        });
        // No undocumented keys: catches a renamed or newly added field.
        expect(RFQ_FIELDS).toEqual(expect.arrayContaining(Object.keys(message)));
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
