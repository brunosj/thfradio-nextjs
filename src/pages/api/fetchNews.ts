import { NextApiRequest, NextApiResponse } from 'next';
import type { NewsType } from '@/types/ResponsesInterface';
import fetch from 'node-fetch';

interface StrapiNewsResponse {
  data: NewsType[];
}
const fetchNews = async (req: NextApiRequest, res: NextApiResponse) => {
  const { locale = 'en' } = req.query;
  const response = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}news-items?locale=${locale}&populate=*`
  );
  const data = (await response.json()) as StrapiNewsResponse;
  res.status(200).json(data.data);
};

export default fetchNews;
