import { g_cred } from '../const/creds/g_auth';

const { AnalyticsAdminServiceClient } =
   require('@google-analytics/admin').v1beta;

export const adminClient = new AnalyticsAdminServiceClient(g_cred);
