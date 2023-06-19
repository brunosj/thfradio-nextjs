// import { NextApiRequest, NextApiResponse } from 'next';
// import { CloudShowTypes } from '@/types/ResponsesInterface';
// import fetch from 'node-fetch';

// interface MixcloudResponse {
//   data: CloudShowTypes[];
// }

// const fetchCloudShows = async (req: NextApiRequest, res: NextApiResponse) => {
//   let shows: CloudShowTypes[] = [];
//   let offset = 0;

//   try {
//     while (shows.length < 350) {
//       const response = await fetch(
//         `${process.env.MIXCLOUD_API}?offset=${offset}`
//       );
//       const data = (await response.json()) as MixcloudResponse;

//       if (data.data.length === 0) {
//         // Stop when there are no more results
//         break;
//       } else {
//         shows = [...shows, ...data.data.slice(0, 350 - shows.length)]; // Add new results while not exceeding 150
//         offset += 20; // Increase the offset for the next fetch
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Failed to fetch shows' });
//   }

//   return res.status(200).json(shows);
// };

// export default fetchCloudShows;

// new fetching, which breaks the tag filtering but is way faster (needs to be implemented)

import { NextApiRequest, NextApiResponse } from 'next';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import fetch from 'node-fetch';

interface MixcloudResponse {
  data: CloudShowTypes[];
}

const fetchCloudShows = async (req: NextApiRequest, res: NextApiResponse) => {
  const limit = 150; // limit of items per fetch
  const totalItems = 1600; // Total items to fetch
  const pages = Math.ceil(totalItems / limit); // number of pages to fetch
  const promises = [];

  try {
    for (let i = 0; i < pages; i++) {
      const promise = fetch(
        `${process.env.MIXCLOUD_API}?offset=${i * limit}&limit=${limit}`
      )
        .then((res) => res.json())
        .then((data: any) => data as MixcloudResponse)
        .then((data: MixcloudResponse) => data.data);

      promises.push(promise);
    }

    const results = await Promise.all(promises);

    // If there are more items fetched than totalItems, slice the array to the desired length
    const shows = results.flat().slice(0, totalItems);

    return res.status(200).json(shows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch shows' });
  }
};

export default fetchCloudShows;
