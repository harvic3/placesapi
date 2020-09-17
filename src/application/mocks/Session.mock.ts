import { Session } from "../../domain/session/Session";

const goodSession = new Session();
goodSession.uid = "user-uid";
goodSession.email = "user@email.com";
goodSession.displayName = "Nikola Tesla";
goodSession.phoneNumber = "+573003003030";
goodSession.language = "en";
goodSession.localId = 1;

export { goodSession };
