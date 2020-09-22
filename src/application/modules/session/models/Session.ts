export class Session {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  claims: { [key: string]: unknown };
  language: string;
  localId: number;

  static IsValidSession(session: Session): boolean {
    if (!session || !session.uid || !session.email || !session.displayName || !session.localId) {
      return false;
    }
    return true;
  }
}
