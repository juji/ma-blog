import algoliasearch from 'algoliasearch/lite'
import { 
  NEXT_PUBLIC_ALGOLIA_API, 
  NEXT_PUBLIC_ALGOLIA_INDEX,
  NEXT_PUBLIC_ALGOLIA_APP 
} from './constants';

const client = algoliasearch(
  NEXT_PUBLIC_ALGOLIA_APP as string, 
  NEXT_PUBLIC_ALGOLIA_API as string
);

const index = client.initIndex(NEXT_PUBLIC_ALGOLIA_INDEX as string);

export default async function searchText( text: string ){

  return await index.search(text, {
    // attributesToRetrieve: ['firstname', 'lastname'],
    hitsPerPage: 5,
  })

}

