import { BpxApiClient } from '../../src/bpxApiClient';

// Client for testing
export function createClient() {
  return new BpxApiClient({
    apiKey: 'API-KEY',       // replace with your API key
    apiSecret: 'API-SECRET', // replace with your API secret
    debug: false
  });
}