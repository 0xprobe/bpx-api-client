import { BpxApiClient } from '../../src/bpxApiClient';

// Client for testing.
// Real credentials are read from a `.env` file (BPX_API_KEY / BPX_API_SECRET),
// loaded into process.env via dotenv (see `setupFiles` in jest.config.js), so
// private-endpoint integration tests can run against the live API. When they are
// not set, the placeholders are used (public-endpoint tests still pass;
// private-endpoint tests will fail to authenticate). See .env.example.
export function createClient() {
  return new BpxApiClient({
    apiKey: process.env.BPX_API_KEY || 'API-KEY',       // set BPX_API_KEY to your API key
    apiSecret: process.env.BPX_API_SECRET || 'API-SECRET', // set BPX_API_SECRET to your API secret
    debug: false
  });
}
