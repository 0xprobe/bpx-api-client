import { BpxHttpHandler, HttpMethod } from "../../bpxHttpHandler";
import { QuoteAcceptPayload, RequestForQuoteCancelPayload, RequestForQuoteRefreshPayload, RequestForQuote, QuotePayload, Quote, RequestForQuotePayload, RfqsRequest, RfqWithQuotes, RfqHistoryRequest, RequestForQuoteHistorical, QuoteHistoryRequest, QuoteHistorical, RfqFillHistoryRequest, RequestForQuoteFillHistorical, QuoteFillHistoryRequest, QuoteFillHistorical } from "./rfq.types";

export class RfqApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/RFQ/operation/submit_rfq
  async submitRequestForQuote(body: RequestForQuotePayload) {
    return this.httpHandler.execute<RequestForQuote>(HttpMethod.POST, '/api/v1/rfq', body);
  }

  // https://docs.backpack.exchange/#tag/RFQ/operation/accept_quote
  async acceptQuote(body: QuoteAcceptPayload) {
    return this.httpHandler.execute<RequestForQuote>(HttpMethod.POST, `/api/v1/rfq/accept`, body);
  }

  // https://docs.backpack.exchange/#tag/RFQ/operation/refresh_rfq
  async refreshQuote(body: RequestForQuoteRefreshPayload) {
    return this.httpHandler.execute<RequestForQuote>(HttpMethod.POST, `/api/v1/rfq/refresh`, body);
  }

  // https://docs.backpack.exchange/#tag/RFQ/operation/cancel_rfq
  async cancelRequestForQuote(body: RequestForQuoteCancelPayload) {
    return this.httpHandler.execute<RequestForQuote>(HttpMethod.POST, `/api/v1/rfq/cancel`, body);
  }

  // https://docs.backpack.exchange/#tag/RFQ/operation/submit_quote
  async submitQuote(body: QuotePayload) {
    return this.httpHandler.execute<Quote>(HttpMethod.POST, `/api/v1/rfq/quote`, body);
  }

  // https://docs.backpack.exchange/#tag/RFQ/operation/get_open_rfqs
  async getOpenRfqs(queryParams?: RfqsRequest) {
    return this.httpHandler.execute<RfqWithQuotes[]>(HttpMethod.GET, '/api/v1/rfqs', queryParams);
  }

  // https://docs.backpack.exchange/#tag/RFQ/operation/get_rfq_history
  async getRfqHistory(queryParams: RfqHistoryRequest) {
    return this.httpHandler.execute<RequestForQuoteHistorical[]>(HttpMethod.GET, '/wapi/v1/history/rfq', queryParams);
  }

  // https://docs.backpack.exchange/#tag/RFQ/operation/get_quote_history
  async getQuoteHistory(queryParams: QuoteHistoryRequest) {
    return this.httpHandler.execute<QuoteHistorical[]>(HttpMethod.GET, '/wapi/v1/history/quote', queryParams);
  }

  // https://docs.backpack.exchange/#tag/RFQ/operation/get_rfq_fill_history
  async getRfqFillHistory(queryParams: RfqFillHistoryRequest) {
    return this.httpHandler.execute<RequestForQuoteFillHistorical[]>(HttpMethod.GET, '/wapi/v1/history/rfq/fill', queryParams);
  }

  // https://docs.backpack.exchange/#tag/RFQ/operation/get_quote_fill_history
  async getQuoteFillHistory(queryParams: QuoteFillHistoryRequest) {
    return this.httpHandler.execute<QuoteFillHistorical[]>(HttpMethod.GET, '/wapi/v1/history/quote/fill', queryParams);
  }

}
