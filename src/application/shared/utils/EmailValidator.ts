import resources, { resourceKeys } from "../locals";

export default class EmailValidator {
  static IsValid(email: string): string {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)) {
      return null;
    }
    return resources.GetWithParams(resourceKeys.INVALID_PARAM_VALUE, {
      elementName: resources.Get(resourceKeys.EMAIL),
    });
  }
}
