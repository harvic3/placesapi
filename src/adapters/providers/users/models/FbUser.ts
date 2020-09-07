export class FbUser {
  constructor(uid: string, email: string, displayName: string, phoneNumber: string) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
    this.phoneNumber = phoneNumber;
  }
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  password: string;
  SetPassword(password: string): void {
    if (password) {
      this.password = password;
    }
  }
}
