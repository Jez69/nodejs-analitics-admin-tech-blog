import { env_config } from '../env/env';

const {
   type,
   project_id,
   private_key_id,
   private_key,
   client_email,
   client_id,
   auth_uri,
   token_uri,
   auth_provider_x509_cert_url,
   client_x509_cert_url,
} = env_config();

export const g_cred = {
   credentials: {
      type,
      project_id,
      private_key_id,
      private_key,
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url,
   },
};
