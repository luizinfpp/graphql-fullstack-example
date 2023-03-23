import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';

const GET_QUOTES = gql`
  query GetQuotes {
    quotes{
      id,
      sentence,
      character{
        name
      }
    }
  }
`;

const ListQuotesPage = () => {
  const { loading, error, data } = useQuery(GET_QUOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.quotes.map(({ id, sentence } : any) => (
    <div key={id} className="p-3 m-2 hover:bg-c-h-dark rounded-xl hover:cursor-pointer">
      <Link href={`/quote/${encodeURIComponent(id)}`}>
        <h3 className='text-xl mb-1'>&quot;{sentence}&quot;</h3>
      </Link>
    </div>
  ));
}
 
export default ListQuotesPage;