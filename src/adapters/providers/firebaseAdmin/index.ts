import * as firebaseAdmin from "firebase-admin";
import config from "../../../infrastructure/config";

const credentials = {
  type: config.firebase.credentials.type,
  projectId: config.firebase.credentials.project_id,
  privateKeyId: config.firebase.credentials.private_key_id,
  privateKey: config.firebase.credentials.private_key,
  clientEmail: config.firebase.credentials.client_email,
  clientId: config.firebase.credentials.client_id,
  authUri: config.firebase.credentials.auth_uri,
  tokenUri: config.firebase.credentials.token_uri,
  authProviderX509CertUrl: config.firebase.credentials.auth_provider_x509_cert_url,
  clientC509CertUrl: config.firebase.credentials.client_x509_cert_url,
};

const instance = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(credentials),
  databaseURL: config.firebase.db_url,
});

export default instance;
