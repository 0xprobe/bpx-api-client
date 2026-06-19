import { Side } from "../../../../src/http/common/common.types";
import { QuoteAcceptPayload, RequestForQuoteCancelPayload, RequestForQuoteRefreshPayload, QuotePayload, RequestForQuotePayload, RfqExecutionMode, RfqWithQuotes, RfqHistoryRequest, RequestForQuoteHistorical, QuoteHistoryRequest, QuoteHistorical, RfqFillHistoryRequest, RequestForQuoteFillHistorical, QuoteFillHistoryRequest, QuoteFillHistorical } from "../../../../src/http/private/rfq/rfq.types";
import { isSuccess } from "../../../../src/http/bpxHttpHandler";
import { createClient } from "../../setup";

describe('RFQ API Tests', () => {
    let bpxClient: ReturnType<typeof createClient>;

    beforeAll(() => {
        bpxClient = createClient();
    });

    describe('Submit Request for Quote', () => {
        it('Submits a request for quote', async () => {
            const payload: RequestForQuotePayload = {
                symbol: 'SOL_USDC_RFQ',
                side: Side.Bid,
                executionMode: RfqExecutionMode.AwaitAccept
            };
            const response = await bpxClient.rfq.submitRequestForQuote(payload);
            expect(response).toBeDefined();
            expect(typeof response.statusCode).toBe('number');
        });
    });

    describe('Accept Quote', () => {
        it('Accepts a quote for a request for quote', async () => {
            const payload: QuoteAcceptPayload = {
                rfqId: '12345',
                quoteId: '67890'
            };

            const response = await bpxClient.rfq.acceptQuote(payload);
            expect(response).toBeDefined();
            expect(typeof response.statusCode).toBe('number');
        });
    });

    describe('Refresh Quote', () => {
        it('Refreshes a quote for a request for quote', async () => {
            const body: RequestForQuoteRefreshPayload =
            {
                rfqId: '12345'
            };

            const response = await bpxClient.rfq.refreshQuote(body);

            expect(response).toBeDefined();
            expect(typeof response.statusCode).toBe('number');
        });
    });

    describe('Cancel Request for Quote', () => {
        it('Cancels a request for quote', async () => {
            const payload: RequestForQuoteCancelPayload = {
                rfqId: '12345'
            };

            const response = await bpxClient.rfq.cancelRequestForQuote(payload);
            expect(response).toBeDefined();
            expect(typeof response.statusCode).toBe('number');
        });
    });

    describe('Submit Quote', () => {
        it('Submits a quote for a request for quote', async () => {
            const payload: QuotePayload = {
                rfqId: '12345',
                bidPrice: '49000',
                askPrice: '51000'
            };

            const response = await bpxClient.rfq.submitQuote(payload);
            expect(response).toBeDefined();
            expect(typeof response.statusCode).toBe('number');
        });
    });

    describe('Get open RFQs', () => {
        it('Retrieves the open RFQs for the account', async () => {
            const response = await bpxClient.rfq.getOpenRfqs();

            expect(isSuccess(response)).toBe(true);
            expect(Array.isArray(response.data)).toBe(true);

            const rfqs = response.data as RfqWithQuotes[];

            rfqs.forEach(item => {
                expect(item.rfq).toMatchObject({
                    rfqId: expect.any(String),
                    symbol: expect.any(String),
                    side: expect.any(String),
                    status: expect.any(String),
                    executionMode: expect.any(String)
                });
                expect(Array.isArray(item.quotes)).toBe(true);
            });
        });
    });

    describe('Get Rfq history', () => {
        it('Retrieves the rfq history for the user', async () => {
            const request: RfqHistoryRequest = {
                limit: 10,
                offset: 0
            };

            const response = await bpxClient.rfq.getRfqHistory(request);

            expect(isSuccess(response)).toBe(true);
            const rfqs = response.data as RequestForQuoteHistorical[];
            // expect(rfqs.length).toBeGreaterThan(0);

            rfqs.forEach(rfq => {
                expect(rfq).toMatchObject({
                    userId: expect.any(Number),
                    rfqId: expect.any(String),
                    symbol: expect.any(String),
                    side: expect.any(String),
                    submissionTime: expect.any(String),
                    expiryTime: expect.any(String),
                    status: expect.any(String),
                    executionMode: expect.any(String),
                    createdAt: expect.any(String)
                });
            });
        });
    });

    describe('Get quote history', () => {
        it('Retrieves the quote history for the user', async () => {
            const request: QuoteHistoryRequest = {
                limit: 10,
                offset: 0
            };

            const response = await bpxClient.rfq.getQuoteHistory(request);

            expect(isSuccess(response)).toBe(true);
            const quotes = response.data as QuoteHistorical[];
            // expect(quotes.length).toBeGreaterThan(0);

            quotes.forEach(quote => {
                expect(quote).toMatchObject({
                    userId: expect.any(Number),
                    rfqId: expect.any(String),
                    quoteId: expect.any(String),
                    symbol: expect.any(String),
                    bidPrice: expect.any(String),
                    askPrice: expect.any(String),
                    status: expect.any(String),
                    createdAt: expect.any(String)
                });
            });
        });
    });

    describe('Get rfq fill history', () => {
        it('Retrieves the rfq fill history for the user', async () => {
            const request: RfqFillHistoryRequest = {
                limit: 10,
                offset: 0
            };

            const response = await bpxClient.rfq.getRfqFillHistory(request);

            expect(isSuccess(response)).toBe(true);
            const fills = response.data as RequestForQuoteFillHistorical[];
            // expect(fills.length).toBeGreaterThan(0);

            fills.forEach(fill => {
                expect(fill).toMatchObject({
                    rfqId: expect.any(String),
                    quoteId: expect.any(String),
                    symbol: expect.any(String),
                    side: expect.any(String),
                    fillPrice: expect.any(String),
                    createdAt: expect.any(String),
                    filledAt: expect.any(String)
                });
            });
        });
    });

    describe('Get quote fill history', () => {
        it('Retrieves the quote fill history for the user', async () => {
            const request: QuoteFillHistoryRequest = {
                limit: 10,
                offset: 0
            };

            const response = await bpxClient.rfq.getQuoteFillHistory(request);

            expect(isSuccess(response)).toBe(true);
            const fills = response.data as QuoteFillHistorical[];
            // expect(fills.length).toBeGreaterThan(0);

            fills.forEach(fill => {
                expect(fill).toMatchObject({
                    quoteId: expect.any(String),
                    rfqId: expect.any(String),
                    symbol: expect.any(String),
                    side: expect.any(String),
                    quantity: expect.any(String),
                    fillPrice: expect.any(String),
                    fee: expect.any(String),
                    feeSymbol: expect.any(String),
                    createdAt: expect.any(String),
                    filledAt: expect.any(String)
                });
            });
        });
    });
});
