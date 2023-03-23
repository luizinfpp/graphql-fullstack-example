import { useQuery, gql } from "@apollo/client";

const GET_QUOTE = gql`
  query GetQuote($id: Int!) {
    quote(id: $id) {
      id,
      sentence,
      character{
        name,
        house{
          name
        }
      }
    }
  }
`;

const ShowQuoteComponent = ({ quoteId } : {quoteId : number}) => {
  const { loading, error, data } = useQuery(GET_QUOTE, { variables: { "id": quoteId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message + " - " + quoteId}</p>;

  return(
    <div
      key={data.quote.id}
      className="p-3 m-2 hover:bg-c-h-dark rounded-xl hover:cursor-pointer"
    >
      <h3 className="text-4xl mb-3">&quot;{data.quote.sentence}&quot;</h3>   
      <p className="text-xl mb-2">{data.quote.character.name}</p>
      <p className="text-sm mb-1 italic">{data.quote.character.house.name}</p>
    </div>
  );
}
 
export default ShowQuoteComponent;