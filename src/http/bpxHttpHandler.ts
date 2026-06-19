import { ApiResponse, HttpMethod } from './common/api.types';
import { API_ENDPOINT_INSTRUCTION_MAP } from './instruction';
import { BpxSigner } from '../authentication/bpxSigner';
import { BpxCredentials } from '../authentication/bpxCredentials';

export class BpxHttpHandler {
  
  private httpUrl: string = 'https://api.backpack.exchange';
  private readonly debug: boolean;

  constructor(
    private readonly auth: BpxCredentials,
    opts: { httpUrl?: string, debug?: boolean } = {}
  ) {
    this.httpUrl = opts.httpUrl || this.httpUrl;
    this.debug = opts.debug || false;
  }

  async execute<T>(method: HttpMethod, uri: string, body?: Record<string, any>): Promise<ApiResponse<T>> {

    try {
      let url = uri;
      if (body && method === HttpMethod.GET) {
        // Build the query string while:
        // - dropping undefined/null params (otherwise they get serialized as the
        //   literal strings "undefined"/"null" and the server rejects them), and
        // - expanding arrays into repeated keys (e.g. marketType=SPOT&marketType=PERP)
        //   as required by the API (style=form, explode=true). The comma-joined
        //   form is rejected by the server with a 400.
        // This also keeps the sent query in sync with the signed payload, since
        // BpxSigner applies the same normalization; otherwise the signature would
        // not match the request.
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(body)) {
          if (value === undefined || value === null) continue;
          if (Array.isArray(value)) {
            for (const item of value) {
              if (item === undefined || item === null) continue;
              params.append(key, String(item));
            }
          } else {
            params.append(key, String(value));
          }
        }
        const queryString = params.toString();
        if (queryString) {
          url = `${uri}${url.includes('?') ? '&' : '?'}${queryString}`;
        }
      }

      const instruction = API_ENDPOINT_INSTRUCTION_MAP[`${method}:${uri}`];

      // console.log('instruction : ', instruction);
      let headers: Record<string, string> = {};

      if (instruction) {
        const signedHeaders = BpxSigner.generateHttpAuthSignature(
          this.auth.verifyingKey,
          this.auth.signingKey,
          instruction,
          body || {}
        );
        headers = signedHeaders;
      }

      if (method !== HttpMethod.GET) {
        headers['Content-Type'] = 'application/json';
      }

      if (this.debug) {
        console.log('=== [Debug] HTTP Request ===');
        console.log('URL:', `${this.httpUrl}${url}`);
        console.log('Method:', method);
        console.log('Headers:', headers);
        if (body) {
          if (method === 'GET') {
            console.log('Query Parameters:', body);
          } else {
            console.log('Request Body:', body);
          }
        }
      }

      const response = await fetch(`${this.httpUrl}${url}`, {
        method,
        headers,
        ...(method !== HttpMethod.GET && body ? { body: JSON.stringify(body) } : {})
      });

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json().catch(() => ({}))
        : await response.text();
      
      if (this.debug) {
        console.log('=== [Debug] HTTP Response ===');
        console.log('Status:', response.status);
        console.log('Response Headers:', response.headers);
        console.log('Response Data:', data);
        console.log('=========================');
      }

      if (!response.ok) {  
        let errorCode = 'UNKNOWN_ERROR';
        let errorMessage = 'Unknown error occurred';
        
        if (typeof data === 'object' && data !== null) {
          errorCode = data.code || errorCode;
          errorMessage = data.message || errorMessage;
        } else if (typeof data === 'string') {
          try {
            const parsed = JSON.parse(data);
            errorCode = parsed.code || errorCode;
            errorMessage = parsed.message || errorMessage;
          } catch (e) {
            errorMessage = data;
          }
        }
        return {
          statusCode: response.status,
          data: {},
          error: {
            code: errorCode,
            message: errorMessage
          }
        };
      }

      return {
        statusCode: response.status,
        data: data as T,
        error: {}
      };
    } catch (error) {
      if (this.debug) {
        console.log('=== [Debug] Error ===');
        console.log('Error:', error);
        console.log('=====================');
      }
      return {
        statusCode: 500,
        data: {},
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      };
    }
  }

}

export function isSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T; error: Record<string, never> } {
  return response.statusCode === 200;
}

export * from './common/api.types'; 