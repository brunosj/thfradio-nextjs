import { NextApiRequest, NextApiResponse } from 'next';
import { ShowTypes } from '@/types/ResponsesInterface';
import fetch from 'node-fetch';

interface StrapiShowResponse {
  data: ShowTypes[];
}
const fetchShowListings = async (req: NextApiRequest, res: NextApiResponse) => {
  const { locale = 'en' } = req.query;
  const response = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}shows?locale=${locale}&populate=*`
  );
  const data = (await response.json()) as StrapiShowResponse;
  res.status(200).json(data.data);
};

export default fetchShowListings;
