import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret } = req.query;

  if (process.env.STRAPI_WEBHOOK_SECRET !== secret) {
    return res.status(401).json({ message: 'Invalid Secret' });
  }
  try {
    const slug = JSON.parse(req.body)?.attributes?.slug;

    if (slug) {
      await res.revalidate(`/news/${slug}`);
    }

    await res.revalidate(`/news`);

    return res.json({ revalidated: true });
  } catch (error) {
    console.error(error);

    return res.status(500).send('Error Revalidating');
  }
}
