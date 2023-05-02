import { adminClient } from '../googleClient/connectToGA';
import { limiter } from '../helpers/rateLimiter';
import { googleAnalyticsProperties } from '../const/ga_properties';
import { customDimensions } from '../variables/customDimensions';

const handleCreateCustomDimension = () => {
   const data = customDimensions;
   const properties = googleAnalyticsProperties;

   // @ts-ignore
   const callback = (property, data) =>
      callCreateCustomDimension({ parent: property, customDimension: data });
   const rateLimited = limiter(callback, 1000);
   //@ts-ignore
   return (
      properties
         .map((item) => item.property)
         //@ts-ignore
         .map((property) => Promise.resolve(rateLimited(property, data)))
   );
};

const callCreateCustomDimension = async (
   request: Record<string, string | boolean>,
) => {
   const response = await adminClient.createCustomDimension(request);

   return response;
};

handleCreateCustomDimension();
