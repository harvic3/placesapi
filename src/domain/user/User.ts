export class User {
  constructor(uid: string, email: string, displayName: string, phoneNumber: string) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
    this.phoneNumber = phoneNumber;
    this.disabled = false;
  }
  userId: number;
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  language: string;
  disabled: boolean;
  SetUserId(userId: number): void {
    if (userId) {
      this.userId = userId;
    }
  }
  SetDisabled(): void {
    this.disabled = true;
  }
  SetLanguage(language: string): void {
    if (language) {
      this.language = language;
    }
  }
}
