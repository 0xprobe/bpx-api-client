export class BpxCredentials {

  constructor(
    public readonly verifyingKey: string, // API Key
    public readonly signingKey: string // API Secret
  ) {}
    
}