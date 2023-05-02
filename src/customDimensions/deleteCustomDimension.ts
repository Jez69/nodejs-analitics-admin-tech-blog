import { adminClient } from '../googleClient/connectToGA';
import { limiter } from '../helpers/rateLimiter';
import { editDimensions } from '../variables/editDimensions';

const handleDeleteCustomDimension = () => {
   // first run the findCustomDimensions script, get the values, than run this one
   const properties = editDimensions;
   //@ts-ignore
   const cb = (name) => callArchiveCustomDimension({ name: name });
   const rateLimitDelete = limiter(cb, 1000);
   //@ts-ignore
   properties.forEach((item) => rateLimitDelete(item));
};

const callArchiveCustomDimension = async (request: Record<string, string>) => {
   const response = await adminClient.archiveCustomDimension(request);

   return response;
};

handleDeleteCustomDimension();
