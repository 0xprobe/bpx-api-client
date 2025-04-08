import WebSocket from 'ws';
import { BpxSigner } from '../authentication/bpxSigner';
import { BpxCredentials } from '../authentication/bpxCredentials';

export class BpxWebSocketHandler {

  private readonly wsUrl: string = 'wss://ws.backpack.exchange';
  private readonly debug: boolean;
  private ws: WebSocket | null = null;

  constructor(
    private readonly auth: BpxCredentials,
    opts: { wsUrl?: string, debug?: boolean } = {}
  ) {
    this.wsUrl = opts.wsUrl || this.wsUrl;
    this.debug = opts.debug || false;
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);

      this.ws.on('open', () => {
        console.log('WebSocket connection opened.');
        resolve();
      });

      this.ws.on('close', (code: number, reason: Buffer) => {
        console.log('WebSocket connection closed:', {
          code,
          reason: reason.toString()
        });
      });

      this.ws.on('error', (error: Error) => {
        console.error('WebSocket error:', error);
        reject(error);
      });

      if (this.debug) {
        this.ws.on('message', (data: WebSocket.Data) => {
          console.log('=== [Debug] Incoming WebSocket Message ===');
          console.log('From:', `${this.wsUrl}`);
          console.log('Message:', data.toString());
        });
      }
    });
  }

  on(event: string, listener: (...args: any[]) => void): () => void {
    if (!this.ws) {
      throw new Error('WebSocket connection not established');
    }
    
    this.ws.on(event, listener);
    
    return () => {
      if (this.ws) {
        this.ws.removeListener(event, listener);
      }
    };
  }

  onMessage(callback: (data: any) => void): () => void {

    if (!this.ws) {
      throw new Error('WebSocket connection not established');
    }
    const messageHandler = (data: WebSocket.Data) => {
      try {
        // required : convert to string and parse as JSON
        const parsedData = JSON.parse(data.toString());
        callback(parsedData);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
    
    this.ws.on('message', messageHandler);
    
    return () => {
      if (this.ws) {
        this.ws.removeListener('message', messageHandler);
      }
    };
  }

  async send(params: Record<string, any>): Promise<void> {
    if (!this.ws) {
      throw new Error('WebSocket connection not established');
    }

    const message = JSON.stringify(params);
    this.ws.send(message);

    if (this.debug) {
      console.log('=== [Debug] Outgoing WebSocket Message ===');
      console.log('To:', `${this.wsUrl}`);
      console.log('Message:', message);
    }

  }

  async sendWithSignature(params: Record<string, any>): Promise<void> {
    if (!this.ws) {
      throw new Error('WebSocket connection not established');
    }

    const signature = BpxSigner.generateWsAuthSignature(
      this.auth.verifyingKey,
      this.auth.signingKey
    );

    const signedParams = {
      ...params,
      signature: signature
    };

    const message = JSON.stringify(signedParams);
    this.ws.send(message);

    if (this.debug) {
      console.log('=== [Debug] Outgoing WebSocket Message ===');
      console.log('To:', `${this.wsUrl}`);
      console.log('Message:', message);
    }
  }

  async disconnect(): Promise<void> {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      console.log('WebSocket connection closed gracefully');
    }
  }
      
}