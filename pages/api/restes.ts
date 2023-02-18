import { NextApiRequest, NextApiResponse } from 'next';
import { getAllRecipes } from 'services/recipes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await getAllRecipes();
    res.status(200).json(result);
  } catch (err) {
    console.error('API has returned error', err);
    // eslint-disable-next-line no-throw-literal
    res.status(200).json(err);
  }
}
