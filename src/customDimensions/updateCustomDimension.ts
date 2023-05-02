import { adminClient } from '../googleClient/connectToGA';
import { limiter } from '../helpers/rateLimiter';
import { editDimensions } from '../variables/editDimensions';

const handleUpdateCustomDimension = () => {
   //@ts-ignore
   const cb = (request) => callUpdateCustomDimension(request);
   const rateLimitUpdate = limiter(cb, 1000);

   // also set the find dimension variable
   // and run find custom dimensions
   // and than run this script
   //
   // if you want to update other custom dimensions
   // change appropriate properties
   editDimensions.forEach((item: string) => {
      const request = {
         customDimension: {
            name: item,
            description: 'updated description goes here',
            // ^^ description, displayName, disallowAdsPersonalization
         },
         updateMask: {
            paths: ['description'],
            // ^^ description, displayName, disallowAdsPersonalization
         },
      };

      //@ts-ignore
      rateLimitUpdate(request);
   });
};

const callUpdateCustomDimension = async (request: any) => {
   const response = await adminClient.updateCustomDimension(request);

   return response;
};

handleUpdateCustomDimension();
