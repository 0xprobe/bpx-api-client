import { BpxHttpHandler, HttpMethod } from "../../bpxHttpHandler";
import { AcceptQuoteRequest, CancelQuoteRequest, RefreshQuoteRequest, RFQResponse, SubmitQuoteRequest, SubmitQuoteResponse, SubmitRFQRequest } from "./requestForQuote.types";

export class RequestForQuoteApi {

  constructor(private httpHandler: BpxHttpHandler) {}

  // https://docs.backpack.exchange/#tag/Request-For-Quote/operation/submit_rfq
  async submitRequestForQuote(body: SubmitRFQRequest) {
    return this.httpHandler.execute<RFQResponse>(HttpMethod.POST, '/api/v1/rfq', body);
  }

  // https://docs.backpack.exchange/#tag/Request-For-Quote/operation/accept_quote
  async acceptQuote(body: AcceptQuoteRequest) {
    return this.httpHandler.execute<RFQResponse>(HttpMethod.POST, `/api/v1/rfq/accept`, body);
  }
    
  // https://docs.backpack.exchange/#tag/Request-For-Quote/operation/refresh_rfq
  async refreshQuote(body: RefreshQuoteRequest) {
    return this.httpHandler.execute<RFQResponse>(HttpMethod.POST, `/api/v1/rfq/refresh`, body);
  }

  // https://docs.backpack.exchange/#tag/Request-For-Quote/operation/cancel_rfq
  async cancelRequestForQuote(body: CancelQuoteRequest) {
    return this.httpHandler.execute<RFQResponse>(HttpMethod.POST, `/api/v1/rfq/cancel`, body);
  }

  // https://docs.backpack.exchange/#tag/Request-For-Quote/operation/submit_quote
  async submitQuote(body: SubmitQuoteRequest) {
    return this.httpHandler.execute<SubmitQuoteResponse>(HttpMethod.POST, `/api/v1/rfq/quote`, body);
  }
}