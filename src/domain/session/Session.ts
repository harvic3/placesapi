export class Session {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  claims: { [key: string]: boolean };
  language: string;
}
