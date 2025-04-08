// https://docs.backpack.exchange/#tag/System/operation/get_status
// [RESPONSE]
export interface StatusAndMessage {
  status: Status;
  message: string | null;
}

export enum Status {
  Ok = 'Ok',
  Maintenance = 'Maintenance',
}

