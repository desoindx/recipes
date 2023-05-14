import { NextApiRequest, NextApiResponse } from 'next'
import { getRecipe } from 'services/recipes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await getRecipe(req.query.id as string)
    res.status(200).json(result)
  } catch (err) {
    console.error('API has returned error', err)
    // eslint-disable-next-line no-throw-literal
    res.status(200).json(err)
  }
}
