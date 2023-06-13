import { NextApiRequest, NextApiResponse } from 'next';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import fetch from 'node-fetch';

interface MixcloudResponse {
  data: CloudShowTypes[];
}

const fetchShows = async (req: NextApiRequest, res: NextApiResponse) => {
  let shows: CloudShowTypes[] = [];
  let offset = 0;

  try {
    while (shows.length < 150) {
      const response = await fetch(
        `${process.env.MIXCLOUD_API}?offset=${offset}`
      );
      const data = (await response.json()) as MixcloudResponse;

      if (data.data.length === 0) {
        // Stop when there are no more results
        break;
      } else {
        shows = [...shows, ...data.data.slice(0, 150 - shows.length)]; // Add new results while not exceeding 150
        offset += 20; // Increase the offset for the next fetch
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch shows' });
  }

  return res.status(200).json(shows);
};

export default fetchShows;
