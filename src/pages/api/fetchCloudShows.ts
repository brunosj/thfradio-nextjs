import { NextApiRequest, NextApiResponse } from 'next';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import fetch from 'node-fetch';

interface MixcloudResponse {
  data: CloudShowTypes[];
}

const fetchCloudShows = async (req: NextApiRequest, res: NextApiResponse) => {
  const limit = 100;
  const totalItems = 2000;
  const pages = Math.ceil(totalItems / limit);
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
    const shows = results.flat().slice(0, totalItems);

    return res.status(200).json(shows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch shows' });
  }
};

export default fetchCloudShows;
