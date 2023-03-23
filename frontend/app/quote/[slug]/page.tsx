"use client";

import ShowQuoteComponent from "../../../components/showQuote";

const SingleQuotePage = ({ params } : { params: {slug: string} }) => {
  const quoteId : number = parseInt(params.slug);
  
  return(
    <>
      <ShowQuoteComponent quoteId={quoteId} />
    </>
  );
};

export default SingleQuotePage;
