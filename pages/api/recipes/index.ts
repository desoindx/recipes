import { NextApiRequest, NextApiResponse } from 'next';
import { getRecipes } from 'services/recipes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await getRecipes();
    res.status(200).json(result);
  } catch (err) {
    console.error('API has returned error', err);
    // eslint-disable-next-line no-throw-literal
    res.status(200).json(err);
  }
}
