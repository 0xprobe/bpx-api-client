import { BpxHttpHandler, HttpMethod } from "../../bpxHttpHandler";
import { QuoteAcceptPayload, RequestForQuoteCancelPayload, RequestForQuoteRefreshPayload, RequestForQuote, QuotePayload, Quote, RequestForQuotePayload } from "./requestForQuote.types";

export class RequestForQuoteApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/Request-For-Quote/operation/submit_rfq
  async submitRequestForQuote(body: RequestForQuotePayload) {
    return this.httpHandler.execute<RequestForQuote>(HttpMethod.POST, '/api/v1/rfq', body);
  }

  // TODO : 여기서부터 시작할 것
  // https://docs.backpack.exchange/#tag/Request-For-Quote/operation/accept_quote
  async acceptQuote(body: QuoteAcceptPayload) {
    return this.httpHandler.execute<RequestForQuote>(HttpMethod.POST, `/api/v1/rfq/accept`, body);
  }
    
  // https://docs.backpack.exchange/#tag/Request-For-Quote/operation/refresh_rfq
  async refreshQuote(body: RequestForQuoteRefreshPayload) {
    return this.httpHandler.execute<RequestForQuote>(HttpMethod.POST, `/api/v1/rfq/refresh`, body);
  }

  // https://docs.backpack.exchange/#tag/Request-For-Quote/operation/cancel_rfq
  async cancelRequestForQuote(body: RequestForQuoteCancelPayload) {
    return this.httpHandler.execute<RequestForQuote>(HttpMethod.POST, `/api/v1/rfq/cancel`, body);
  }

  // https://docs.backpack.exchange/#tag/Request-For-Quote/operation/submit_quote
  async submitQuote(body: QuotePayload) {
    return this.httpHandler.execute<Quote>(HttpMethod.POST, `/api/v1/rfq/quote`, body);
  }
}