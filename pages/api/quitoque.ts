import { gql, GraphQLClient } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

const graphQLClient = new GraphQLClient('https://mgs.quitoque.fr/graphql', {
  headers: {
    'Content-Type': 'application/json',
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = gql`
    query planning($id: ID!) {
      planning(id: $id) {
          id
          planningCategories {
              category {
                  name
                  slug
              }
              products {
                  name
                  slug
              }
          }
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query, {id: '2022-08-31'});
    console.debug('GraphQL query result:', result);
    res.status(200).json(result)
  } catch (err) {
    console.error('API has returned error', err);
    // eslint-disable-next-line no-throw-literal
    res.status(200).json(err)
  }

}
