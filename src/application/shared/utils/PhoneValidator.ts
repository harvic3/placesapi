import resources, { resourceKeys } from "../locals";

export default class PhoneValidator {
  static IsValid(phoneNumber: string, length: number): string {
    const pattern = new RegExp(`^\[0-9+]{${length},${length}}$`, "g");
    if (pattern.test(phoneNumber)) {
      return null;
    }
    return resources.GetWithParams(resourceKeys.INVALID_PARAM_VALUE, {
      elementName: resources.Get(resourceKeys.PHONE),
    });
  }
}
