import { adminClient } from '../googleClient/connectToGA';
import { limiter } from '../helpers/rateLimiter';
import { googleAnalyticsProperties } from '../const/ga_properties';
import { findDimensions } from '../variables/findDimensions';

const callListCustomDimensions = async (property: string) => {
   const parent = property;
   const request = {
      parent,
      pageSize: 200,
   };

   const response = await adminClient.listCustomDimensionsAsync(request);

   return response;
};

function findCustomDimension(property: string) {
   const rawData = callListCustomDimensions(property);

   const fs = require('fs');
   // @ts-ignore
   const data = rawData.find((item) => item.name === findDimensions);

   fs.writeFileSync(`./data/foundDimensions.txt`, data);
}

const handleFindCustomDimensions = () => {
   const properties = googleAnalyticsProperties;
   //@ts-ignore
   const cb = (property) => findCustomDimension(property);
   const rateLimitDelete = limiter(cb, 1000);
   //@ts-ignore
   properties.forEach((item) => rateLimitDelete(item));
};

handleFindCustomDimensions();
