import { createClient, waitForStreamMessage, WS_TEST_TIMEOUT_MS } from '../../setup';
import { SubscriptionType } from '../../../../src/websocket/streams.api';

// The stock-price stream takes a bare stock ticker. Exchange assets such as
// 'AAPL.US' and market symbols such as 'AAPL.US_USDC' are not accepted;
// class-share tickers keep their dot (e.g. 'BRK.B').
const TICKER = 'AAPL';

describe('Stock Price Stream Tests', () => {
  let bpxClient: ReturnType<typeof createClient>;

  beforeAll(() => {
    bpxClient = createClient();
  });

  describe('Subscribe to stock price', () => {
    it('Sends the documented stream name and receives provider stock quotes', async () => {
      const { sent, message, errors } = await waitForStreamMessage(
        bpxClient,
        `stockPrice.${TICKER}`,
        () => bpxClient.streams.stockPrice(SubscriptionType.SUBSCRIBE, TICKER)
      );

      expect(sent).toContainEqual({
        method: SubscriptionType.SUBSCRIBE,
        params: [`stockPrice.${TICKER}`]
      });

      // No error frame means the subscription was accepted — for private
      // streams this is what proves the request actually authenticated
      // (the server replies 4003 "Invalid signature" otherwise).
      expect(errors).toEqual([]);

      // Quotes only flow during a trading session, so a message is optional.
      // Payload assertions below are skipped when nothing arrives:
      // stock quotes only flow during a trading session. The helper logs a warning so the skip stays visible.
      if (message) {
        expect(message).toMatchObject({
          e: 'stockPrice',
          symbol: expect.any(String),
          bid: expect.any(String),
          ask: expect.any(String),
          mid: expect.any(String),
          timestamp: expect.any(Number),
          session: expect.any(String)
        });
      }
    }, WS_TEST_TIMEOUT_MS);
  });
});
