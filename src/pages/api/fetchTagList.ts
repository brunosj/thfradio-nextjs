import { NextApiRequest, NextApiResponse } from 'next';
import { TagsList } from '@/types/ResponsesInterface';
import fetch from 'node-fetch';

interface StrapiTagsResponse {
  data: TagsList;
}
const fetchTagList = async (req: NextApiRequest, res: NextApiResponse) => {
  const { locale = 'en' } = req.query;
  const response = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}tag-list?populate[tag][populate]=*`
  );
  const data = (await response.json()) as StrapiTagsResponse;
  res.status(200).json(data.data);
};

export default fetchTagList;
