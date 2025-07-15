import { Side } from "../../../../src/http/common/common.types";
import { QuoteAcceptPayload, RequestForQuoteCancelPayload, RequestForQuoteRefreshPayload, RequestForQuote, QuotePayload, Quote, RequestForQuotePayload, RfqExecutionMode } from "../../../../src/http/private/requestForQuote/requestForQuote.types";
import { createClient } from "../../setup";

describe('Request for Quote API Tests', () => {
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
            expect(response.error.message).toContain('RFQ is disabled');
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
            expect(response.error.message).toContain('RFQ is disabled');
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
            expect(response.error.message).toContain('RFQ is disabled');
        });
    });

    describe('Cancel Request for Quote', () => {
        it('Cancels a request for quote', async () => {
            const payload: RequestForQuoteCancelPayload = {
                rfqId: '12345'
            };
        
            const response = await bpxClient.rfq.cancelRequestForQuote(payload);
            expect(response).toBeDefined();
            expect(response.error.message).toContain('RFQ is disabled');
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
            expect(response.error.message).toContain('RFQ is disabled');
        });
    });
});